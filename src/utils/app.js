class App {
  constructor() {
    this.middleware = new Set();
  }
  use(handler) {
    this.middleware.add(handler);
  }
}

module.exports = App;
