const { bodyParser } = require("../utils/requests");
const Router = require("../utils/router");

const router = new Router();

async function rootPath(req, res) {
  const body = await bodyParser(req);
  res.statusCode = 200;
  res.end("ok");
}

router.get("/", rootPath);

module.exports = {
  router
};
