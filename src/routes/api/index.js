const { postsRouter } = require("./posts");
const Router = require("../../utils/router");

const router = new Router();

router.use("posts", (req, res) => postsRouter._listen(req, res));

module.exports = {
  router
};
