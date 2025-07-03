import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

//const fs = require("fs");
//const path = require("path")
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "note.txt");

const app = express();
const port = 3000;

const textContent = fs.readFileSync("note.txt", "utf8");
let notes = JSON.parse(textContent) || [];
//let notes = [];

function changeToNote() {
  const savedNote = JSON.stringify(notes, null, 2);
  //console.log({ savedNote });
  fs.writeFile(filePath, savedNote, function (err) {
    if (err) throw err;
    console.log("The file is saved.");
  });
}

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { notes });
});

app.get("/open/:id", (req, res) => {
  console.log("Clicked");

  const idToOpen = parseInt(req.params.id);
  try {
    const fileContent = fs.readFileSync("note.txt", "utf8");
    const noteData = JSON.parse(fileContent);
    console.log("Parsed Notes: ", noteData);
    //console.log("Length ", noteData.length);

    for (let i = 0; i < noteData.length; i++) {
      if (idToOpen === noteData[i].id) {
        console.log("Success");
        const displayID = noteData[i].id;
        const displayTitle = noteData[i].title;
        const displayContent = noteData[i].content;
        const display = {
          displayID,
          displayTitle,
          displayContent,
        };
        console.log(display);
        res.render("note.ejs", { display });
        //res.send(`<h1>${display.displayTitle}</h1>`)
      }
    }
  } catch (error) {
    console.error("Cannot read or parsing the file:", error);
  }
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  if (newNote.title == "" && newNote.content == "") {
    //console.log("Add a note");
    res.redirect("/");
  } else {
    notes.push(newNote);
    changeToNote();
    console.log({ notes });
    res.redirect("/");
  }
});

app.post("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const updatedNote = {
    id,
    title,
    content,
  };
  console.log(updatedNote);

  notes.forEach((element) => {
    //console.log("Testing");
    if (element.id === updatedNote.id) {
      element.title = updatedNote.title;
      element.content = updatedNote.content;
    } else {
      console.log("Fail");
    }
  });
  changeToNote();
  //console.log({ notes });
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== idToDelete);
  changeToNote();
  res.redirect("/");
});

app.listen(port, (req, res) => {
  console.log(`running on port ${port}`);
});
