import {
  GET_POSTS,
  GET_POST
} from '../actions/constants';

const INITIAL_STATE = { posts: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload.data.posts };
    case GET_POST:
      return { ...state, post: action.payload.data.post };
    default:
      return state;
  }
}
