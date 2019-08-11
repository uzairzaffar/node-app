const express = require("express");
const Post = require("../model/post-model");
var controller = require('../controller/controller.js');
var postController = require('../controller/post-controller.js');

const router = express.Router();

router.route('/posts').get([controller.checkLogin, postController.getPosts])
                      .post([controller.checkLogin, controller.checkUser, postController.createPost]);

router.route('/posts/:id').get([controller.checkLogin, controller.checkAdminOrUser, postController.getPostById])
                          .patch([controller.checkLogin, controller.checkUser, controller.checkSameUser, postController.updatePostById])
                          .delete([controller.checkLogin, controller.checkAdminOrUser, postController.deletePostById]);


/*router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
*/
module.exports = router;