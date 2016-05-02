# Discuss
> [Serverless](http://serverless.com) forum software

---

Table of contents
- [Setup](#setup)
- [GraphQL queries](#graphql-queries)
  - [users](#users)
  - [posts](#posts)
  - [comments](#comments)

---

## Setup
1. Run `serverless project init` to initialize the Serverless project.

2. Add the following environment variables to the JSON array of the corresponding file in `_meta/variables`.

```
{
  ...

  "authTokenSecret": "STRONGVALUE"
}
```

3. `cd` into the root of the project. Run `npm install` to install all necessary NPM dependencies for the Serverless project.

4. Run `cd backend/lib && npm install && cd ../../` to install the NPM dependencies for the GraphQL backend.

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
