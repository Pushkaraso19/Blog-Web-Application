import express from "express";

const app = express();
const port = 3000;

var posts = [
    {
      "id": 1,
      "title": "The Journey of Web Development",
      "content": "Web development has evolved significantly over the years, with modern frameworks simplifying complex processes."
    },
    {
      "id": 2,
      "title": "Why Node.js is Amazing",
      "content": "Node.js is a powerful tool for building server-side applications with JavaScript. It offers scalability, speed, and efficiency."
    },
    {
      "id": 3,
      "title": "Understanding Express.js",
      "content": "Express.js is a lightweight framework for Node.js that simplifies routing and middleware integration for web apps."
    },
    {
      "id": 4,
      "title": "CSS Grid vs. Flexbox",
      "content": "Both CSS Grid and Flexbox are powerful layout tools. While Grid is better for 2D layouts, Flexbox excels in 1D alignment."
    },
    {
      "id": 5,
      "title": "Responsive Web Design Tips",
      "content": "Creating responsive designs requires flexible layouts, media queries, and testing on various devices and screen sizes."
    }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/" , (req,res) => {
    res.render("index.ejs", { 
      postList : posts,
      deleted: false
    });  
});

app.get("/newPost", (req,res) => {
    res.render("newPost.ejs", {completed: false});    
});

app.get("/editPost", (req,res) => {
    res.render("editPost.ejs", {completed: false});

});

app.get("/deletePost", (req,res) => {
  res.render("deletePost.ejs", {completed: false});

});

app.get("/editPostD", (req, res) => {
  const post = posts.find(postId => postId.id === parseInt(req.query.id));
  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("editPost.ejs", {
    completed: false,
    postId: post.id,
    postTitle: post.title,
    postContent: post.content
  });
});

app.get("/deletePostD", (req, res) => {
  const postIndex = posts.findIndex(post => post.id === parseInt(req.query.id));
  posts.splice(postIndex, 1);
  res.redirect("/")
});

app.post("/add", (req, res) => {
  let newPost = {
      id: posts.length + 1,
      title: req.body.title,
      content: req.body.content
  };
  posts.push(newPost);
  res.render("newPost.ejs", { completed: true }); 
});

app.post("/edit", (req,res) => {
  const post = posts.find(post => post.id === parseInt(req.body.id));
  if (!post) {
    return res.status(404).send("Post not found");
  }
  post.title = req.body.title;
  post.content = req.body.content;
  res.render("editPost.ejs", {
    completed: true,
    postId: post.id,
    postTitle: post.title,
    postContent: post.content
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});