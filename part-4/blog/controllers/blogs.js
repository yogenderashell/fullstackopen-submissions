const BlogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user.model");

BlogRouter.get("/", (request, response) => {
  Blog.find({}).then(async (blogs) => {
    const populatedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const user = await User.findById(blog.user);
        const userWithoutblogs = user.toJSON();
        delete userWithoutblogs.blogs;
        return { ...blog.toJSON(), user: userWithoutblogs };
      })
    );
    response.json(populatedBlogs);
  });
});

BlogRouter.post("/", (request, response, next) => {
  const body = request.body;
  const blog = Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});
BlogRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

BlogRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

BlogRouter.put("/:id", (req, res, next) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  };
  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = BlogRouter;
