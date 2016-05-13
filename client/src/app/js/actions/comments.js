import { API_URL } from './index';

import {
  ERROR,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './constants';

export function createComment(comment) {
  const query = { "query":
    `mutation createComment {
      comment: createComment (
        body: "${comment.body}",
        postId: "${comment.postId}"
        jwt: "${comment.jwt}"
      )
      {
        id
        body
        createdAt
        updatedAt
        author {
          id
          username
          gravatar
        }
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/graphql/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_COMMENT,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateComment(comment) {
  const query = { "query":
    `mutation updateComment {
      comment: updateComment (
        id: "${comment.id}",
        body: "${comment.body}",
        jwt: "${comment.jwt}"
      )
      {
        id
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/graphql/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_COMMENT,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function deleteComment(comment) {
  const query = { "query":
    `mutation deleteComment {
      comment: deleteComment (
        id: "${comment.id}"
        jwt: "${comment.jwt}"
      )
      {
        id
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/graphql/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: DELETE_COMMENT,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
