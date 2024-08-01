const blogs = [
  {
    author: "no",
    title: "title1",
    body: "body1",
    likes: 10,
  },
  {
    author: "no",
    title: "title2",
    body: "body2",
    likes: 20,
  },
  {
    author: "yogi",
    title: "title3",
    body: "body3",
    likes: 30,
  },
  {
    author: "no",
    title: "title4",
    body: "body4",
    likes: 40,
  },
  {
    author: "yogi",
    title: "title5",
    body: "body5",
    likes: 50,
  },
];

const mostLikes = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const maxLikesBlog = blogs.find((blog) => blog.likes === maxLikes);
  return { author: maxLikesBlog.author, likes: maxLikes };
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const maxLikesBlog = blogs.find((blog) => blog.likes === maxLikes);
  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  };
};

// console.log(mostLikes(blogs));

const old = { title: "hellow orl", likes: 20 };
console.log(old)

const newBlog = { ...old, likes: 30 };
console.log(newBlog)