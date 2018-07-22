// users 模块负责维护用户信息。
// 这个模块有些特殊，因为它不需要定义 action types 和 action creators，它响应的 action都来自 posts模块和 comments模块。例如，当 posts模块获取帖子列表数 据时， users模块也需要把帖子列表数据中的用户(作者)信息保存到自身 state 中
import { types as commentTypes } from "./comments";
import { types as postTypes } from "./posts";

const initialState = {};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 获取评论列表和帖子列表时，更新列表数据中包含的所有作者信息
    case commentTypes.FETCH_COMMENTS:
    case postTypes.FETCH_ALL_POSTS:
      return { ...state, ...action.users };
    // 获取帖子详情时，只需更新当前帖子的作者信息
    case postTypes.FETCH_POST:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUserById = (state, id) => {
  return state.users[id];
};
