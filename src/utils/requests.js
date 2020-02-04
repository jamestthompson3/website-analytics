/*
 * REQUEST HELPERS
 */
const { cyan } = require("./logging");

async function bodyParser(req) {
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
}

function httpError(res, status, message) {
  res.statusCode = status;
  const timestamp = new Date();
  console.log(cyan(`[${timestamp.toUTCString()}]`), "ERROR CODE: ", status);
  res.end(`${message}`);
}

module.exports = {
  bodyParser,
  httpError
};
