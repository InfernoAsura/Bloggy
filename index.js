import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
const posting = [
    {title: "Lorem Ipsum, a mystery?", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}, 
    {title: "Lorem Ipsum: The origin", content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}
]

app.get('/', (req, res)=>{
    res.render("index.ejs", {posts: posting});
})

app.get('/view/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post_data = posting[postId]
    if (post_data) {
        res.render("view.ejs", { data: post_data, postId });
    } else {
        res.status(404).send("Post not found");
    }
})

app.get('/post', (req, res)=>{
    res.render("post.ejs");
})

app.get('/edit/:id', (req, res)=>{
    let index = req.params.id;
    let post = posting[index];
    res.render("post.ejs", {post, postIndex:index});
})

app.post('/create', (req, res)=>{
    const new_post = new addPost(req.body["title"], req.body["content"]);
    posting.push(new_post)
    res.redirect("/")
})

app.post('/update', (req, res)=>{
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    posting[index] = new addPost(title, content);
    // console.log(req.body);
    res.redirect("/");
})

app.post('/delete/:id', (req, res)=>{
    let index = req.params.id;
    posting.splice(index, 1);
    res.redirect("/");
})

function addPost(title, content){
    this.title = title
    this.content = content
}

app.listen(port, ()=>{
    console.log("server listening on port");
})