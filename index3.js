const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4: uuidv4} = require('uuid');        //unique id generat
// //npm i uuid

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {   id: uuidv4(),
        username: "rohan_koyande",
        content: "i love surabhi",
    },
    {   id: uuidv4(),
        username: "sur_uhh_bhi",
        content: "i love rohan",
    },
    {   id: uuidv4(),
        username: "husky",
        content: "wooh",
    },
];

app.listen(port, () => {
    console.log("listening on port 8080");
});

app.get("/posts",(req, res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req, res) => {
    res.render("form.ejs");
});

app.post("/posts",(req, res) => {
    let {username, content } = req.body;
    let id = uuidv4(); 
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);  //comparing id
    res.render("show.ejs");
});

app.patch("/posts/:id", (req, res) => { //patch. hotposch should be used
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);  //comparing id
    post.content = newcontent;
    console.log(post);  
    res.redirect("/posts");
});   


app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);  //comparing id
    res.render("edit.ejs",{post});
})


app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id); 
    //old post arr. id not equal to
    res.redirect("/posts");
})