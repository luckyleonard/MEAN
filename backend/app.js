const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { connectionStr } = require("./config");
const postsRouter = require("./routes/posts");

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

app.use("/api/posts", postsRouter);

module.exports = app;
