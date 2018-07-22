import { combineReducers } from 'redux';
import { get, post } from '../../utils/request';
import url from '../../utils/url';
import { actions as appActions } from './app';

const initialState = {
  byPost: {},
  byId: {}
};

export const types = {
  FETCH_COMMENTS: "COMMENTS/FETCH_COMMENTS", // 获取评论列表
  CREATE_COMMENT: "COMMENTS/CREATE_COMMENT"  // 新建评论
}

export const actions = {
  // 获取评论列表
  fetchComments: postId => {
    return (dispatch, getState) => {
      if (shouldFetchComments(postId, getState())) {
        dispatch(appActions.startRequest());
        return get(url.getCommentList(postId)).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { comments, commentIds, users } = convertToPlainStructure(data);
            dispatch(fetchCommentsSuccess(postId, commentIds, comments, users));
          } else {
            dispatch(appActions.setError());
          }
        });
      }
    }
  },
  // 新建评论列表
  createComment: comment => {
    return (dispatch,  getState) => {
      dispatch(appActions.startRequest());
      return post(url.createComment(), comment).then((data) => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(createCommentSuccess(data.post, data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      })
    }
  }
}

// 获取评论列表成功
const fetchCommentsSuccess = (postId, commentIds, comments, users) => ({
  type: types.FETCH_COMMENTS,
  postId,
  commentIds,
  comments,
  users
});

// 新建评论成功
const createCommentSuccess = (postId, comment) => ({
  type: types.CREATE_COMMENT,
  postId,
  comment
});

const shouldFetchComments = (postId, state) => {
  // 如果用户没有获取某帖子评论列表，则byPost里面没有该帖子的id
  return !state.comments.byPost[postId];
};

const convertToPlainStructure = comments => {
  let commentsById = [], commentIds = [], authorsById = {};
  for (const item of comments) {
    commentsById[item.id] = { ...item, author: item.author.id };
    commentIds.push(item.id);
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  }
  return {
    comments: commentsById,
    commentIds,
    // 从后端返回的数据中提取出所有评论者的信息，更新user表
    users: authorsById
  };
};

const byPost = (state = initialState.byPost, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return { ...state, [action.postId]: action.commentIds };
    case types.CREATE_COMMENT:
      return {
        ...state,
        [action.postId]: [action.comment.id, ...state[action.postId]]
      };
    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return { ...state, ...action.comments };
    case types.CREATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    default:
      return state;
  }
};

const reducer = combineReducers({
  byPost,
  byId
});

export default reducer;

export const getCommentIdsByPost = (state, postId) =>
  state.comments.byPost[postId];

export const getComments = state => state.comments.byId;

export const getCommentById = (state, id) => state.comments.byId[id];
