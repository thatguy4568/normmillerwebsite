import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let notes = []; 


app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.render("index", { notes });
});
 app.post("/new", (req, res) =>{
    const {title, content} = req.body;
    const newNote = {
        id: Date.now(),
        title, content,
    };
    newNote.title = newNote.title.slice(0,10) + "...";
    notes.push(newNote);
    res.redirect("/")
})

app.post("/delete/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== idToDelete);
    res.redirect("/");
  });

app.listen(port, (req, res)=>{
    console.log(`running on port ${port}`);
});