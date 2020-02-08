const Router = require("../../utils/router");

const router = new Router();

router.get("posts", (req, res) => {
  res.status = 200;
  res.end("OK");
});

router.post("posts", (req, res) => {
  console.dir(req.body);
  res.status = 200;
  res.end(req.body);
});

module.exports = {
  postsRouter: router
};
