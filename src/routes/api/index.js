const { postsRouter } = require("./posts");
const Router = require("../../utils/router");

const router = new Router();

router.use("posts", postsRouter);

module.exports = {
  router
};
