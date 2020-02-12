const Router = require("../../utils/router");

const router = new Router();

router.get("posts", (req, res) => {
  res.end("<html><h1>HELLO</h1></html>");
});

router.post("posts", (req, res) => {
  console.dir(req.body);
  res.end(req.body);
});

module.exports = {
  postsRouter: router
};
