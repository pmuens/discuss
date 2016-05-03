import {
  GET_POSTS
} from '../actions/constants';

const INITIAL_STATE = { posts: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload.data.posts };
    default:
      return state;
  }
}
