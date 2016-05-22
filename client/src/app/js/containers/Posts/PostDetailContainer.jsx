import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';
import Post from '../../components/Posts/PostDetail';
import Comments from '../../components/Comments/Comments';
import CommentNewContainer from '../../containers/Comments/CommentNewContainer';

class PostDetailContainer extends Component {
  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  render() {
    const { post, comments, currentUser } = this.props;

    return (
      <div>
        <Post
          post={ post }
          isAuthor={ currentUser && post.author.id === currentUser.id }
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
  getPost
})(PostDetailContainer);
