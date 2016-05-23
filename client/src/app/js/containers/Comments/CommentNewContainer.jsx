import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comments';
import CommentForm from '../../components/Comments/CommentForm';

class CommentNewContainer extends Component {
  constructor(props) {
    super(props);
  }
  handleCreateComment(comment) {

    const body = comment.body.replace(/(?:\r\n|\r|\n)/g, '<br />');

    if (body.length !== 0) {
      const post = {
        body,
        postId: this.props.post.id,
        jwt: this.props.currentUser.jwt
      };

      this.props.createComment(post);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <CommentForm
          isLoggedIn={currentUser}
          onSubmitForm={this.handleCreateComment.bind(this)}
        />
      </div>
    );
  }
}

export default connect(null, {createComment})(CommentNewContainer);
