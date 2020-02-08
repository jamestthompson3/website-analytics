const HTTP = {
  OK: "HTTP/1.1 200 OK\r\n\r\n",
  NOT_FOUND: "HTTP/1.1 404 NOT FOUND\r\n\r\n",
  BAD_REQUEST: "HTTP/1.1 400 BAD REQUEST\r\n\r\n",
  NOT_SUPPORTED: "HTTP/1.1 405 NOT_SUPPORTED\r\n\r\n"
};

const SYMBOLS = {
  ROUTER: Symbol("router")
};

module.exports = {
  HTTP,
  SYMBOLS
};
