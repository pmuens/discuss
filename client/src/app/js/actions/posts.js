import 'whatwg-fetch';

import { API_URL } from './index';

import {
  ERROR,
  GET_POSTS
} from './constants';

export function getPosts() {
  const query = { 'query':
    `{
      posts {
        id
        title
        createdAt
        updatedAt
        author {
          id
          username
        }
        comments {
          id
          body
          createdAt
          updatedAt
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
    type: GET_POSTS,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
