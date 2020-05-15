const express = require("express");
const expressFileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost.js");
const path = require("path");

const app = new express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressFileupload());

app.set("view engine", "ejs");
app.set("views", "./views");

mongoose.connect(
  "mongodb://localhost/blog1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("MongoDB connected")
);

app.listen(port, () => console.log("app on port 3000"));

app.get("/", (req, res) => {
  BlogPost.create({}, (error, posts) => {
    console.log(posts);
    res.render("index", { blogposts: posts });
  });
});

app.get("/post/:id", (req, res) => {
  BlogPost.findById(req.params.id, (error, detailPost) => {
    res.render("post", {
      detailPost,
    });
  });
});

app.post("/posts/store", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/upload", image.name), (error) => {
    BlogPost.create(
      { ...req.body, image: "/upload/" + image.name },
      (error) => {
        res.redirect("/");
      }
    );
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.render("error404");
});
