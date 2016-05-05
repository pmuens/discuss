import { API_URL } from './index';

import {
  ERROR,
  CREATE_COMMENT,
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
