const { bodyParser } = require("../utils/requests");

const routes = new Map();

async function rootPath(req, res) {
  const body = await bodyParser(req);
  res.statusCode = 200;
  res.end("ok");
}

routes.set("/", rootPath);

const router = (req, res) => {
  const routeFunction = routes.get(req.url);
  routeFunction(req, res);
};
module.exports = {
  router
};
