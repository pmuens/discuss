import 'whatwg-fetch';

import { API_URL } from './index';

import {
  ERROR,
  GET_POSTS,
  GET_POST
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

export function getPost(id) {
  const query = { 'query':
    `{
      post(id: "${id}") {
        id
        title
        body
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
          author {
            id
            username
          }
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
    type: GET_POST,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
