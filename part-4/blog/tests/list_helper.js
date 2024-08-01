const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
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

const mostLikes = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const maxLikesBlog = blogs.find((blog) => blog.likes === maxLikes);
  return { author: maxLikesBlog.author, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
};
