import express from "express";
import bodyParser from "body-parser";
import path from"path";
import posts from "./posts.js";
import { title } from "process";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
     res.render("index.ejs",{posts:posts})
});

app.post("/submit",(req,res)=>{
    const userhed=req.body.heading;
    const usercontent=req.body.write
    posts.push({id:Date.now().toString(),userhed,usercontent});
    res.render("view.ejs",{userheding:userhed,userwrite:usercontent,posts:posts});

});

app.get("/edit/:id",(req,res)=>{
     const post=posts.find(p=>p.id===req.params.id);
     if(post){
        res.render("edit.ejs",{post})
     } else{
        res.status(404).send("page not Found")
     }
});



app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.userhed = req.body.heading;
        post.usercontent = req.body.write;
        res.render('view.ejs', { post, posts });
    } else {
        res.status(404).send("Page not found");
    }
});

app.get("/new",(req,res)=>{
     res.redirect("/");
});


app.post('/delete/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.render('view.ejs', { post: null, posts: posts });
    } else {
        res.status(404).send("Page not found");
    }
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


