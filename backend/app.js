const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { connectionStr } = require("./config");
const Post = require("./models/post");

const app = express();

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connect to MongoDB Success");
  })
  .catch((error) => {
    console.error("Connect to MongoDB fail with error:" + error);
  });
// mongoose.connection.on("error", console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}); //The preflight request is just a request with method "OPTIONS" that goes to the very same endpoint. It should respond 200

app.post("/api/posts", (req, res) => {
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

app.get("/api/posts", (req, res) => {
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

app.delete("/api/posts/:postId", (req, res) => {
  Post.deleteOne({ _id: req.params.postId }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
