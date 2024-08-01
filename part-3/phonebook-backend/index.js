const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./mongo");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/api/info", (req, res) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        res.send(
          `<p>The Phone book has info of ${
            persons.length
          } people</p><p>${Date()}</p>`
        );
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ internalError: err });
    });
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => {
      if (persons) res.json(persons);
      else res.status(404).end();
    })
    .catch((err) => {
      console.log(err);
      res.send(500).sendStatus({ imternalError: err });
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  const newPerson = new Person(person);

  newPerson
    .save()
    .then((savedPerson) => {
      console.log("Person saved successfully");
      res.status(201).json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const person = req.body;
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  const newPerson = {
    name: person.name,
    number: person.number,
  };
  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
