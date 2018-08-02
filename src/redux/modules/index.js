import { combineReducers } from "redux";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import comments, { getCommentIdsByPost, getCommentById } from "./comments";
import posts, { getPostIds, getPostById } from "./posts";
import users, { getUserById } from "./users";

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
  app,
  auth,
  ui,
  posts,
  comments,
  users
});

// complex selectors
export const getPostListWithAuthors = state => {
  const postIds = getPostIds(state);
  return postIds.map(id => {
    const post = getPostById(state, id);
    return { ...post, author: getUserById(state, post.author) };
  });
};

export default rootReducer;
