const qs = require('querystring');

class Nuntio {
  constructor(message, data, page, ctx) {
    if (typeof message !== 'string') {
      [data, page, message] = [message, data, page];
    }

    page && (page.page = page.page && parseInt(page.page));
    page && (page.limit = page.limit && parseInt(page.limit));
    page && (page.offset = page.offset && parseInt(page.offset));

    this.data = data;
    this.page = page;
    this.message = message || 'OK';
    this.statusCode = 200;

    this.ctx = ctx;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      page: this.constructPage(),
      data: this.data
    };
  }

  constructUrl(query) {
    const ctx = this.ctx;
    return `${ctx.protocol}://${ctx.host}${ctx.path}?${qs.stringify(query)}`;
  }

  constructPage() {
    if (!this.page || typeof this.page !== 'object' || !this.page.count) return;

    let prevPage, nextPage, prevOffset, nextOffset;
    let { page, offset, limit, count } = this.page;

    const { query } = this.ctx;

    if (!offset && isFinite(page)) {
      offset = page * limit;
    }

    if (offset > 0) {
      prevPage = page - 1;
      prevOffset = Math.max(0, offset - limit);
    }

    if (count > offset + limit) {
      nextPage = page + 1;
      nextOffset = offset + limit;
    }

    return {
      ...this.page,
      prev:
        isFinite(prevOffset) &&
        this.constructUrl({ ...query, limit, page: prevPage, offset: prevOffset }),
      next:
        isFinite(nextOffset) &&
        this.constructUrl({ ...query, limit, page: nextPage, offset: nextOffset })
    };
  }

  updateCtxWithError(ctx) {
    ctx.status = this.statusCode;
    ctx.body = this;
  }

  /**
   * @param {object} [opts={}] - configure middlewar
   * @param [opts.catchAll=false] - catch non-Nutio errors
   * @param [opts.expose=false] - pass error info to client
   * @param [opts.log=true] - log caught exceptions
   * @return {function}
   */
  static middleware(opts = {}) {
    opts = { catchAll: false, expose: false, log: true, ...opts };

    return async function NuntioMiddleware(ctx, next) {
      try {
        await next();
        if (ctx.type === 'application/json' && !ctx.state.nuntio_skip) {
          ctx.body = new Nuntio(ctx.message, ctx.body, ctx.page, ctx).toJSON();
        }
      } catch (error) {
        if (error instanceof Nuntio) {
          error.updateCtxWithError(ctx);
        } else if (opts.catchAll) {
          if (opts.log) console.error(error);
          Nuntio.error(error.message, error, opts).updateCtxWithError(ctx);
        } else {
          throw error;
        }
      }
    };
  }

  static end(ctx, body, message) {
    body = body || ctx.body || null;
    message = message || ctx.message === 'Not Found' ? 'OK' : ctx.message;

    ctx.body = new Nuntio(message, body, ctx.page, ctx).toJSON();

    ctx.state.nuntio_skip = true;
  }

  /**
   * Check if val evaluates to true, otherwise throw supplied error.
   * @param {*} val - value to check if true
   * @param {string|object|function|Error} error - will be thrown if assertion fails
   */
  static assert(val, error) {
    if (!!val) return;

    if (typeof error === 'function') {
      error = error();
    }

    throw error;
  }

  static error(message, error, options) {
    if (message instanceof Error) {
      [error, options, message] = [message, error, options];
    } else if (!(error instanceof Error)) {
      [message, options, error] = [message, error, options];
    }

    options = options || {};
    message = message || 'Internal Server Error';

    // Support calling with statusCode only;
    if (typeof options === 'number') {
      options = { statusCode: options };
    }

    options.expose = options.expose || process.env.NODE_ENV === 'development';

    const nuntio = new Nuntio(message, options.expose && { original: error });

    if (!error) {
      error = new Error();
      Error.captureStackTrace(error, Nuntio);
    }

    const { statusCode = 500, ...restOpts } = options;

    nuntio.error = error;
    nuntio.data = { original: error };
    nuntio.options = restOpts;
    nuntio.statusCode = statusCode;

    return nuntio;
  }

  static unauthorized(message = 'unauthorized', options) {
    return Nuntio.error(message, { statusCode: 401, ...options });
  }
}

module.exports = Nuntio;
