class Nuntio {
  constructor(message, data, page) {
    if (typeof message !== "string") {
      [data, page, message] = [message, data, page];
    }

    this.data = data;
    this.page = page;
    this.message = message || "OK";
    this.statusCode = 200;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      page: this.page,
      data: this.data
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
   * @return {function}
   */
  static middleware(opts = {}) {
    opts = { catchAll: false, expose: false, ...opts };

    return async function NuntioMiddleware(ctx, next) {
      try {
        await next();
        ctx.body = new Nuntio(ctx.message, ctx.body, ctx.page);
      } catch (error) {
        if (error instanceof Nuntio) {
          error.updateCtxWithError(ctx);
        } else if (opts.catchAll) {
          Nuntio.error(error.message, error, opts).updateCtxWithError(ctx);
        } else {
          throw error;
        }
      }
    };
  }

  /**
   * Check if val evaluates to true, otherwise throw supplied error.
   * @param {*} val - value to check if true
   * @param {string|object|function|Error} error - will be thrown if assertion fails
   */
  static assert(val, error) {
    if (!!val) return;

    if (typeof error === "function") {
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

    options.expose = options.expose || process.env.NODE_ENV === "development";

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

  static unauthorized(message = "unauthorized", options) {
    return Nuntio.error(message, { statusCode: 401, ...options });
  }
}

module.exports = Nuntio;
