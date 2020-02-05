"use strict";

const http = require("http");
const { green, cyan } = require("./utils/logging");
const { router: apiRouter } = require("./routes/api");
const { httpError } = require("./utils/requests");
const HTTP = require("./constants");

/*
 * MAIN SERVER
 */

console.log(green(Date()), "STARTING SERVER  🤖");
http
  .createServer(async (req, res) => {
    const [prefix, path] = req.url.substring(1).split("/");
    if (prefix === "api") {
      req.url = path || "/";
      apiRouter._listen(req, res);
    } else {
      httpError(res, 404, HTTP.NOT_FOUND);
    }
  })
  .listen(8080);