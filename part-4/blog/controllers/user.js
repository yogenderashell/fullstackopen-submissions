const UserRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

UserRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});
UserRouter.get("/", (req, res) => {
  User.find({}).then((users) => {
    res.json(users);
  });
});

UserRouter.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

UserRouter.put("/:id", (req, res) => {
  const body = req.body;
  const user = {
    username: body.username,
    name: body.name,
    blogs: body.blogs,
  };
  User.findByIdAndUpdate(req.params.id,user);
  res.status(200).json(user);
});

module.exports = UserRouter;
