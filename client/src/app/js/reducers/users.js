import {
  SIGN_IN,
  SIGN_OUT
} from '../actions/constants';

const INITIAL_STATE = { currentUser: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGN_IN:
      return { ...state, currentUser: action.payload.data.user };
    case SIGN_OUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
}
