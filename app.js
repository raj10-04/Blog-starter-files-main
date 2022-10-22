//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. ";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis.";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function(req,res){
  res.render('home',{
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about',function(req,res){
  res.render('about',{aboutContent,aboutContent});
})

app.get('/contact',function(req,res){
  res.render('contact',{contactContent,contactContent});
})

app.get('/compose',function(req,res){
  res.render('compose');
})

app.post('/compose',function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
})

app.get('/posts/:postName',function(req,res){
  const requestTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle===requestTitle){
      console.log("Match!")
    };
  })
})

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
