"use strict";

require("dotenv").config();
const http = require("http");
const { green } = require("./utils/logging");
const { router: apiRouter } = require("./routes/api");
const { httpError, bodyParser } = require("./utils/requests");
const { HTTP } = require("./constants");
const App = require("./utils/app");

/***
 * NOTES
 * Middleware pattern:
 * */

function mainRouter(req, res) {
  const [prefix, path] = req.url.substring(1).split("/");
  switch (prefix) {
    case "api": {
      req.url = path || "/";
      apiRouter._listen(req, res);
      break;
    }
    case "version": {
      res.status = 200;
      res.end();
      break;
    }
    default:
      httpError(res, 404, HTTP.NOT_FOUND);
      break;
  }
}
/*
 * MAIN SERVER
 */
const app = new App({ debug: true });
app.use(bodyParser);
app.use(mainRouter);
console.log(green(Date()), "STARTING SERVER  🤖");
http.createServer((req, res) => app.init(req, res)).listen(8080);
