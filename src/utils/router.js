const { SYMBOLS } = require("../constants");
const { httpError } = require("./requests");
const { STATUS_CODES } = require("http");

/*
 * @typedef ReqArgs {{
 *  req: http.ClientRequest,
 *  res: http.ServerResponse
 *  }}
 */

/*
 * @type ReqHandler function(ReqArgs): void
 */

// TODO params parsing, i.e. /api/:id/
class Router {
  constructor() {
    this.getRoutes = new Map();
    this.postRoutes = new Map();
    this.putRoutes = new Map();
    this.deleteRoutes = new Map();
    this.$$typeof = SYMBOLS.ROUTER;
    this.middleware = new Map();
  }
  // @param {string}
  // @params {ReqHandler}
  get(url, reqHandler) {
    this.getRoutes.set(url, reqHandler);
  }
  post(url, reqHandler) {
    this.postRoutes.set(url, reqHandler);
  }
  put(url, reqHandler) {
    this.putRoutes.set(url, reqHandler);
  }
  delete(url, reqHandler) {
    this.deleteRoutes.set(url, reqHandler);
  }
  // @private
  async handleIncomingRequest(handler) {
    if (!handler) {
      httpError(this.res, 405, STATUS_CODES[405]);
    } else {
      await handler(this.req, this.res);
    }
  }
  use(url, handler) {
    const pathMapping = this.middleware.get(url);
    if (!pathMapping) {
      const pathMiddleware = [];
      pathMiddleware.push(handler);
      this.middleware.set(url, pathMiddleware);
    } else {
      pathMapping.push(handler);
    }
  }
  // @private
  async _listen(req, res) {
    this.req = req;
    this.res = res;
    const middleware = this.middleware.get(req.url);
    if (middleware) {
      middleware.forEach(async plugin => {
        // this case, the middleware is another Router
        if (plugin.$$typeof === SYMBOLS.ROUTER) {
          await plugin._listen(req, res);
        } else {
          await plugin(req, res);
        }
      });
    }
    // if one of our middleware have ended the request
    if (!res.writableEnded) {
      switch (req.method) {
        case "GET": {
          this.handleIncomingRequest(this.getRoutes.get(req.url));
          break;
        }
        case "POST": {
          this.handleIncomingRequest(this.postRoutes.get(req.url));
          break;
        }
        case "PUT": {
          this.handleIncomingRequest(this.putRoutes.get(req.url));
          break;
        }
        case "DELETE": {
          this.handleIncomingRequest(this.deleteRoutes.get(req.url));
          break;
        }
        default: {
          httpError(res, 405, STATUS_CODES[405]);
          break;
        }
      }
    }
  }
}

module.exports = Router;
