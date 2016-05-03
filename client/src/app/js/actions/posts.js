import 'whatwg-fetch';
import { push } from 'react-router-redux';

import { API_URL } from './index';

import {
  ERROR,
  CREATE_POST,
  GET_POSTS,
  GET_POST
} from './constants';

export function createPost(post) {
  const query = { "query":
    `mutation createPost {
      post: createPost (
        title: "${post.title}",
        body: "${post.body}"
        jwt: "${post.jwt}"
      )
      {
        id
        title
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
    type: CREATE_POST,
    payload: json
  }))
  .then(() => dispatch(push('/')))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

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
