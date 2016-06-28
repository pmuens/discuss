# Discuss
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

> [Serverless](http://serverless.com) forum software

---

Table of contents
- [Video demo](#video-demo)
- [Setup](#setup)
  - [backend](#backend)
  - [client](#client)
- [GraphQL queries](#graphql-queries)
  - [users](#users)
  - [posts](#posts)
  - [comments](#comments)

---

## Video demo
[![Discuss YouTube video](https://img.youtube.com/vi/ygOKXkhj6wo/0.jpg)](https://www.youtube.com/watch?v=ygOKXkhj6wo)

## Setup
### Backend
1. Clone `git clone git@github.com:JustServerless/discuss.git` to your local machine.

2. Run `cd discuss` to change directory.

3. Run `npm install` to install all necessary NPM dependencies for the Serverless project.

4. Run `serverless project init` to initialize the Serverless project.

5. Add the following environment variables to the JSON array of the corresponding file in `_meta/variables`. (e.g. in `_meta/variables/s-variables-common.json`)

```
{
  ...

  "authTokenSecret": "STRONGVALUE"
}
```

6. Run `cd backend/lib && npm install && cd ../../` to install the NPM dependencies for the GraphQL backend.

7. Run `serverless dash deploy` and select endpoint and function to deploy the CORS enabled endpoint and function.

### Client
1. Run `cd client/src && npm install` tin install the NPM dependencies for the client.

2. Replace the `API_URL` in `client/src/app/js/actions/index.js` with your deployed endpoint (the root of the endpoint) without the `graphql` string at the end.

3. Run `npm start` (in the client/src folder) to run the client locally. The client is available in your browser at `http://localhost:8080/`

4. Edit ```s-project.json``` and change ```bucketName```.  Run `npm run build` to build the client

5. Run `serverless client deploy` to host the frontend with the help of an S3 bucket

---

## GraphQL queries
Connect to the `graphql` endpoint of the API (e.g. `http://example.com/graphql`) and a run the query as the `query` parameter against it.

### Users
#### signUp
```
mutation signUp {
  signUp (
    email: "test@example.com"
    username: "test"
    password: "12345678"
  )
  {
    id
    email
    username
    createdAt
    updatedAt
  }
}
```

#### signIn
```
mutation signIn {
  signIn (
    email: "test@example.com"
    password: "12345678"
  )
  {
    id
    email
    username
    createdAt
    updatedAt
    jwt
  }
}
```

#### users
```
{
  users {
    id
    email
    username
    createdAt
    updatedAt
  }
}
```

#### user
```
{
  user(id: "id") {
    id
    email
    username
    createdAt
    updatedAt
  }
}
```

#### updateCurrentUser
```
mutation updateCurrentUser {
  updateCurrentUser(
    email: "new@example.com"
    username: "New username"
    password: "New password"
    jwt: "jwtToken"
  )
  {
    id
    username
    email
    createdAt
    updatedAt
  }
}
```

#### deleteCurrentUser
```
mutation deleteCurrentUser {
  deleteCurrentUser (
    jwt: "jwtToken"
  )
  {
    id
    username
    email
    createdAt
    updatedAt
  }
}
```

---

### Posts
### createPost
```
mutation createPost {
  createPost (
    title: "Title"
    body: "Body"
    jwt: "jwtToken"
  )
  {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
    comments {
      id
      body
      createdAt
      updatedAt
      author {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
}
```

#### posts
```
{
  posts {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
    comments {
      id
      body
      createdAt
      updatedAt
      author {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
}
```

#### post
```
{
  post(id: "id") {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
    comments {
      id
      body
      createdAt
      updatedAt
      author {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
}
```

#### updatePost
```
mutation updatePost {
  updatePost(
    id: "id"
    title: "New title"
    body: "New body"
    jwt: "jwtToken"
  )
  {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
    comments {
      id
      body
      createdAt
      updatedAt
      author {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
}
```

#### deletePost
```
mutation deletePost {
  deletePost (
    id: "id"
    jwt: "jwtToken"
  )
  {
    id
    title
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
    comments {
      id
      body
      createdAt
      updatedAt
      author {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
}
```

---

### Comments
#### createComment
```
mutation createComment {
  createComment (
    body: "Body"
    postId: "postId"
    jwt: "jwtToken"
  )
  {
    id
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
```

#### comments
```
{
  comments {
    id
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
```

#### comment
```
{
  comment(id: "id") {
    id
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
```

#### updateComment
```
mutation updateComment {
  updateComment(
    id: "id"
    body: "New body"
    jwt: "jwtToken"
  )
  {
    id
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
```

#### deleteComment
```
mutation deleteComment {
  deleteComment (
    id: "id"
    jwt: "jwtToken"
  )
  {
    id
    body
    createdAt
    updatedAt
    author {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
```
