class Harald {
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

  static middleware() {
    return async function HaraldMiddleware(ctx, next) {
      try {
        await next();
        ctx.body = new Harald(ctx.message, ctx.body, ctx.page);
      } catch (e) {
        if (e instanceof Harald) {
          ctx.status = e.statusCode;
          ctx.body = e;
        } else {
          throw e;
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

    const harald = new Harald(message, options.expose && { original: error });

    if (!error) {
      error = new Error();
      Error.captureStackTrace(error, Harald);
    }

    const { statusCode = 500, ...restOpts } = options;

    harald.error = error;
    harald.data = { original: error };
    harald.options = restOpts;
    harald.statusCode = statusCode;

    return harald;
  }

  static unauthorized(message = "unauthorized", options) {
    return Harald.error(message, { statusCode: 401, ...options });
  }
}

module.exports = Harald;
