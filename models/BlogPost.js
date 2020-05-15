const mongoose = require("mongoose");
//const connectDB = require("./mongoose.js");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  quote: String,
  image: String,
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
