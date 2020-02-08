"use strict";

require("dotenv").config();
const http = require("http");
const { green } = require("./utils/logging");
const { router: apiRouter } = require("./routes/api");
const { httpError, bodyParser } = require("./utils/requests");
const { HTTP } = require("./constants");

/*
 * MAIN SERVER
 */
console.log(green(Date()), "STARTING SERVER  🤖");
http
  .createServer(async (req, res) => {
    const [prefix, path] = req.url.substring(1).split("/");
    const body = await bodyParser(req); // TODO some sort of middleware model?
    req.body = body;
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
  })
  .listen(8080);
