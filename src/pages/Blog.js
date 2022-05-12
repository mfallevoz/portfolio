import React from "react";
import ArticleWrap from "../components/ArticleWrap";
import Navigation from "../components/Navigation";

const Blog = () => {
  return (
    <div>
      <Navigation />
      <div className="content">
        <h1>Blog</h1>
        <ArticleWrap />
        <ArticleWrap />
        <ArticleWrap />
        <ArticleWrap />
      </div>
    </div>
  );
};

export default Blog;
