const { magenta } = require("./logging");

class App {
  constructor({ debug = false }) {
    this.middleware = [];
    this.debug = debug;
  }
  use(handler) {
    this.middleware.push(handler);
  }
  logMiddleware(plugin) {
    if (!plugin.name) {
      console.log(
        magenta("!!WARNING!! "),
        "you have passed an anonymous function as middleware, debugging might get tricky"
      );
    } else {
      console.log("CALLING MIDDLEWARE: ", plugin.name);
    }
  }
  async init(req, res) {
    let index = 0;
    // assign since `next()` will hijack 'this'
    const { middleware, logMiddleware, debug } = this;
    async function next() {
      if (index < middleware.length) {
        const nextMiddleware = index + 1;
        debug && logMiddleware(middleware[nextMiddleware]);
        await middleware[nextMiddleware](req, res, next);
        index++;
      }
    }
    debug && logMiddleware(middleware[0]);
    await middleware[0](req, res, next);
  }
}

module.exports = App;
