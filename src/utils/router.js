const {
  HTTP: { NOT_SUPPORTED },
  SYMBOLS
} = require("../constants");
const { httpError } = require("./requests");

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
  }
  // @param {string}
  // @params {ReqHandler}
  get(url, reqHandler) {
    this.getRoutes.set(url, reqHandler);
  }
  // @param {string}
  // @params {ReqHandler}
  post(url, reqHandler) {
    this.postRoutes.set(url, reqHandler);
  }
  // @param {string}
  // @params {ReqHandler}
  put(url, reqHandler) {
    this.putRoutes.set(url, reqHandler);
  }
  // @param {string}
  // @params {ReqHandler}
  delete(url, reqHandler) {
    this.deleteRoutes.set(url, reqHandler);
  }
  // @private
  handleIncomingRequest(handler) {
    if (!handler) {
      httpError(this.res, 405, NOT_SUPPORTED);
    } else {
      handler(this.req, this.res);
    }
  }
  use(url, handler) {
    return function(req, res) {
      if (req.url === url) {
        handler(req, res);
      }
    };
  }
  // @private
  _listen(req, res) {
    this.req = req;
    this.res = res;
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
        httpError(res, 405, NOT_SUPPORTED);
        break;
      }
    }
  }
}

module.exports = Router;
