const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = model("Post", postSchema);
