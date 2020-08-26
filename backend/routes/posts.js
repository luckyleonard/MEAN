const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.post("", (req, res) => {
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

router.patch("/:postId", (req, res) => {
  Post.updateOne(
    { _id: req.params.postId },
    {
      title: req.body.title,
      content: req.body.content,
    }
  ).then((result) => {
    res.status(200).json({ message: "Update successful" });
  });
});

router.get("", (req, res) => {
  // const posts = [
  //   {
  //     id: "fadf12421l",
  //     title: "First server-side post",
  //     content: "This is coming from the server",
  //   },
  //   {
  //     id: "ksajflaj132",
  //     title: "Second server-side post",
  //     content: "This is coming from the server!",
  //   },
  // ];
  Post.find().then((resData) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: resData,
    });
  });
});

router.get("/:postId", (req, res) => {
  Post.findById(req.params.postId).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

router.delete("/:postId", (req, res) => {
  Post.deleteOne({ _id: req.params.postId }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
