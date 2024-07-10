const express = require("express");

const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === parseInt(id));
  if (note) res.json(note);
  else res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== parseInt(id));
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const id = notes.length + 1;
  const noteObject = { id, ...note };
  console.log(noteObject);
  notes = notes.concat(noteObject);
  res.json(noteObject);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
