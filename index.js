"use strict";

const http = require("http");

/*
 * REQUEST HELPERS
 */
const httpError = (res, status, message) => {
  res.statusCode = status;
  const timestamp = new Date();
  res.end(`[${timestamp.toUTCString()}]: ${message}`);
};

const receiveArgs = async req =>
  new Promise(res => {
    const body = [];
    req
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", async () => {
        const data = body.join("");
        try {
          const args = JSON.parse(data);
          res(args);
        } catch (e) {
          res({});
        }
      });
  });

/*
 * MAIN SERVER
 */
http
  .createServer(async (req, res) => {
    const [prefix, path] = req.url.substring(1).split("/");
    if (prefix === "api") {
      const args = await receiveArgs(req);
      res.statusCode = 200;
      res.end("ok");
    } else {
      httpError(res, 400, "METHOD NOT SUPPORTED");
    }
  })
  .listen(8080);

console.log("STARTING SERVER");
