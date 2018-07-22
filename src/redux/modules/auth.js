import { post } from '../../utils/request';
import url from '../../utils/url';
import { actions as appActions } from './app';

const initialState = {
  userId: null,
  username: null
};

export const types = {
  LOGIN: 'AUTH/LOGIN',                       // 登录
  LOGOUT: 'AUTH/LOGOUT',                     //注销
};

export const actions = {
  // 异步action, 执行登录验证
  login: (username, password) => {
    return dispatch => {
      // 请求开始前发送action
      dispatch(appActions.startRequest());
      const params = { username, password };
      return post(url.login(), params).then(data => {
        // 请求结束后发送action
        if (!data.error) {
          dispatch(actions.setLoginInfo(data.userId, username));
        } else {
          dispatch(appActions.setError(data.error));
        }
      })
    }
  },
  logout: () => {
    type: types.LOGOUT
  },
  setLoginInfo: (userId, username) => ({
    type: types.LOGIN,
    userId,
    username
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, userId: action.userId, username: action.username };
    case types.LOGOUT:
      return { ...state, userId: null, username: null };
    default:
      return state;
  }
};

export default reducer;

export const getLoggedUser = state => state.auth;
