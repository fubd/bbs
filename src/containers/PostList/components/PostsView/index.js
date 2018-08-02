import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PostItem from "../PostItem";

const postsView = ({ posts }) => (
  <ul>
    {posts.map(item => (
      <Link key={item.id} to={`/posts/${item.id}`}>
        <PostItem post={item} />
      </Link>
    ))}
  </ul>
);

export default postsView;
