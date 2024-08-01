const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initializeBlogs = [
  {
    title: "first blog",
    author: "Yogender Sharma",
    url: "/first-blog",
    likes: 10,
    id: "668f8b023f0b0f6d35ff1e5e",
  },
  {
    title: "second blog",
    author: "hello Sharma",
    url: "/second-blog",
    likes: 20,
    id: "668f972876c9f9e8f257cad4",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initializeBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initializeBlogs[1]);
  await blogObject.save();
});

test.only("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogToTest = response.body[0];

  assert.notStrictEqual(blogToTest.id, undefined);
  assert.strictEqual(blogToTest._id, undefined);
});

test("successfully creates a new blog post", async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "/new-blog",
    likes: 5,
  };

  const initialResponse = await api.get("/api/blogs");
  const initialBlogsCount = initialResponse.body.length;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const finalResponse = await api.get("/api/blogs");
  const finalBlogsCount = finalResponse.body.length;

  assert.strictEqual(finalBlogsCount, initialBlogsCount + 1);

  const titles = finalResponse.body.map((blog) => blog.title);
  assert.strictEqual(titles.includes(newBlog.title), true);
});

test("defaults likes to 0 if likes property is missing", async () => {
  const newBlogWithoutLikes = {
    title: "Blog Without Likes",
    author: "Author Unknown",
    url: "/blog-without-likes",
  };

  await api
    .post("/api/blogs")
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const createdBlog = response.body.find(
    (blog) => blog.title === newBlogWithoutLikes.title
  );

  assert.strictEqual(createdBlog.likes, 0);
});

test("deletes a single blog post resource", async () => {
  const initialResponse = await api.get("/api/blogs");
  const blogToDelete = initialResponse.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const finalResponse = await api.get("/api/blogs");
  const finalBlogsCount = finalResponse.body.length;

  assert.strictEqual(finalBlogsCount, initialResponse.body.length - 1);
  const deletedBlog = finalResponse.body.find(
    (blog) => blog.id === blogToDelete.id
  );
  assert.strictEqual(deletedBlog, undefined);
});

test("updates the information of an individual blog post", async () => {
  const initialResponse = await api.get("/api/blogs");
  const blogToUpdate = initialResponse.body[0];
  const updatedBlogData = {
    title: "Updated Title",
    author: "Updated Author",
    url: "https://updatedurl.com",
    likes: blogToUpdate.likes + 1,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const finalResponse = await api.get(`/api/blogs/${blogToUpdate.id}`);
  const updatedBlog = finalResponse.body;

  assert.strictEqual(updatedBlog.title, updatedBlogData.title);
  assert.strictEqual(updatedBlog.author, updatedBlogData.author);
  assert.strictEqual(updatedBlog.url, updatedBlogData.url);
  assert.strictEqual(updatedBlog.likes, updatedBlogData.likes);
});

after(async () => {
  await mongoose.connection.close();
});
