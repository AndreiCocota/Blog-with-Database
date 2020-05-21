

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "In 26/02/2020 the COVID-19 makes his appearance in Romania. The world was changed and the planet seems to have stopped. Here I am writing my personal daily routine I have during the quarantine under the state of emergency of my country, which was announced two months ago , what me and my girlfriend do in this unbelievable times, and how we could to get through these times easily.";
const aboutContent = "My name is Andrei Cocota,I am 21 years old, I was born in Petrosani. For two years ago, I have been living in Bucharest, the capital of Romania, with my girlfriend Andreea. I am student at Polytechnic University of Bucharest at Faculty of Mechanical Engineering and Mechatronics. I like programming and to write code and I want to become a Web Developer. In the last year I made many websites and I learned a lot of things about programming.";
const contactContent = "You can text me";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
