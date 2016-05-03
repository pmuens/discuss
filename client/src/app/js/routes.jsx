import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts/index';
import PostsShow from './components/posts/show';
import SignUp from './components/users/sign-up';
import SignIn from './components/users/sign-in';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/:id/show" component={PostsShow} />
    <Route path="sign-up" component={SignUp} />
    <Route path="sign-in" component={SignIn} />
  </Route>
);
