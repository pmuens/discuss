import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts';
import Posts from '../components/Posts';

class PostsContainer extends Component {
  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <Posts posts={ posts } />
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.posts };
}

export default connect(mapStateToProps, { getPosts })(PostsContainer);
