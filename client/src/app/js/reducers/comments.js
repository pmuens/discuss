import _ from 'lodash';

import {
  CREATE_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT
} from '../actions/constants';

const INITIAL_STATE = { comments: [] };

export default function(state = INITIAL_STATE, action) {
  let comments;

  switch(action.type) {
    case CREATE_COMMENT:
      comments = state.comments.slice();
      comments.unshift(action.payload.data.comment);
      return { ...state, comments: comments };
    case GET_COMMENTS:
      return { ...state, comments: action.payload.data.comments };
    case DELETE_COMMENT:
      comments = _.without(state.comments, _.find(state.comments, { id: action.payload.data.comment.id }));
      return { ...state, comments: comments };
    default:
      return state;
  }
}
