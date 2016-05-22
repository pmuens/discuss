import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, updatePost, deletePost } from '../../actions/posts';
import PostDetail from '../../components/Posts/PostDetail';
import Comments from '../../components/Comments/Comments';
import CommentNewContainer from '../../containers/Comments/CommentNewContainer';

class PostDetailContainer extends Component {
  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  handleUpdatePost(post) {
    const id = this.props.params.id;
    const title = post.title;
    const body = post.body.replace(/(?:\r\n|\r|\n)/g, '<br />');

    if (title.length !== 0 && body.length !== 0) {
      const post = {
        id: id,
        title: title,
        body: body,
        jwt: this.props.currentUser.jwt
      };

      this.props.updatePost(post);
    } else {
      alert('You can not submit an empty title or empty body');
    }
  }

  handleDeletePost(post) {
    const id = this.props.params.id;

    if (confirm('Do you really want to delete this post?')) {
      const post = {
        id,
        jwt: this.props.currentUser.jwt
      };

      this.props.deletePost(post);
    }
  }

  render() {
    const { post, comments, currentUser } = this.props;

    return (
      <div>
        <PostDetail
          post={ post }
          isAuthor={ currentUser && post.author.id === currentUser.id }
          onUpdatePost={this.handleUpdatePost.bind(this)}
          onDeletePost={this.handleDeletePost.bind(this)}
        />
        <CommentNewContainer
          post={ post }
          currentUser={ currentUser }
        />
        <Comments
          comments={ comments }
          currentUser={ currentUser }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
    currentUser: state.users.currentUser,
    comments: state.comments.comments
  };
}

export default connect(mapStateToProps, {
  getPost,
  updatePost,
  deletePost
})(PostDetailContainer);
