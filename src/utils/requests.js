/*
 * REQUEST HELPERS
 */
const { cyan } = require("./logging");

async function bodyParser(req, res, next) {
  await new Promise(resolve => {
    const body = [];
    req
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        const data = body.join("");
        try {
          const args = JSON.parse(data);
          resolve(args);
        } catch (e) {
          resolve({});
        }
      });
  });

  next();
}

function httpError(res, status, message) {
  let callerName;
  if (arguments.callee.caller) {
    callerName = arguments.callee.caller.name;
  }
  res.statusCode = status;
  const timestamp = new Date();
  console.log(
    cyan(`[${timestamp}]`),
    `${callerName || "ERROR CODE: "}`,
    status
  );
  res.end(`${message}`);
}

module.exports = {
  bodyParser,
  httpError
};
