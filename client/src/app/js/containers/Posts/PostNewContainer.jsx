import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/posts';
import PostForm from '../../components/Posts/PostForm';

class PostNewContainer extends Component {
  handleCreatePost(post) {

    const title = post.title;
    const body = post.body.replace(/(?:\r\n|\r|\n)/g, '<br />');

    if (title.length !== 0 && body.length !== 0) {
      const post = {
        title,
        body,
        jwt: this.props.currentUser.jwt
      };

      this.props.createPost(post);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <PostForm
          isLoggedIn={currentUser}
          onSubmitForm={this.handleCreatePost.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ users: { currentUser } }) => ({currentUser});

export default connect(mapStateToProps, {createPost})(PostNewContainer);
