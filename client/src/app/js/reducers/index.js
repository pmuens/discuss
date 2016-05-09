import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import UsersReducer from './users';
import PostsReducer from './posts';
import CommentsReducer from './comments';
import ErrorReducer from './error';

export default combineReducers({
  users: UsersReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
  error: ErrorReducer,
  routing: routerReducer
});
