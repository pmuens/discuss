import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../../actions/posts';
import { createComment, deleteComment } from '../../actions/comments';
import { Link } from 'react-router';
import _ from 'lodash';
import TimeAgo from 'react-timeago';

const postUlStyles = {
  marginBottom: '10px'
};

const postLiStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  listStyle: 'none'
};

const postTitleStyles = {
  fontSize: '20px',
  marginBottom: '0px'
};

const deletePostStyles = {
  marginLeft: '10px',
  float: 'right'
};

const postAuthorStyles = {
  fontStyle: 'italic',
  float: 'right'
};

const postBodyStyles = {
  margin: '0px'
};

const commentUlStyles = {
  marginBottom: '10px'
};

const commentLiStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  marginLeft: '50px',
  listStyle: 'none'
};

const commentBodyStyles = {
  margin: '0px'
};

const commentAuthorStyles = {
  fontStyle: 'italic',
  float: 'right'
};

const deleteCommentStyles = {
  marginLeft: '10px',
  float: 'right'
};

const hrStyles = {
  margin: '10px 0px'
};

const clearStyles = {
  clear: 'both'
};

const noDataAvailableStyles = {
  marginTop: '20px',
  textAlign: 'center'
};

const textareaStyles = {
  height: '100px'
};

const timeAgoStyles = {
  fontStyle: 'italic'
};

class PostsShow extends Component {
  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  handleCreateComment(event) {
    event.preventDefault();

    const body = this.refs.body.value;

    if (body.length !== 0) {
      const comment = {
        body,
        postId: this.props.params.id,
        jwt: this.props.currentUser.jwt
      };

      this.props.createComment(comment);

      ReactDOM.findDOMNode(this.refs.body).value = '';

      this.props.getPost(this.props.params.id);
    } else {
      alert('Please fill out all fields');
    }
  }

  handleDeletePost(event, post) {
    event.preventDefault();

    if (confirm('Do you really want to delete this post?')) {
      const post = {
        id: event.currentTarget.getAttribute('data-post-id'),
        jwt: this.props.currentUser.jwt
      };

      this.props.deletePost(post);
    }
  }

  handleDeleteComment(event, comment) {
    event.preventDefault();

    if (confirm('Do you really want to delete this comment?')) {
      const comment = {
        id: event.currentTarget.getAttribute('data-comment-id'),
        jwt: this.props.currentUser.jwt
      };

      this.props.deleteComment(comment);
      this.props.getPost(this.props.params.id);
    }
  }

  render() {
    const { post, currentUser } = this.props;

    const sortedComments = post && post.comments.length ? _.orderBy(post.comments, 'createdAt', ['desc']) : [];

    return (
      <div className="row">
        <div className="twelve columns">
          {post ? (
            <div>
              <ul style={postUlStyles}>
                <li key={`post-${post.id}`} style={postLiStyles}>
                  <h1 style={postTitleStyles}>{post.title}</h1>
                  <hr style={hrStyles}/>
                  <p style={postBodyStyles}>{post.body}</p>
                  <hr style={hrStyles} />
                  <TimeAgo date={+post.createdAt} style={timeAgoStyles} />
                  {currentUser && post.author.id === currentUser.id ? (
                    <a href="#" style={deletePostStyles} data-post-id={post.id} onClick={this.handleDeletePost.bind(this)}>
                      <i className="fa fa-trash"></i>
                    </a>
                  ) : null}
                  <span style={postAuthorStyles}>{post.author.username}</span>
                  <div style={clearStyles}></div>
                </li>
              </ul>
              <hr />
              {currentUser ? (
                <div>
                  <form onSubmit={this.handleCreateComment.bind(this)}>
                    <textarea style={textareaStyles} placeholder="Body" className="u-full-width" ref="body"></textarea>
                    <input type="submit" className="button button-primary" value="Submit comment" />
                  </form>
                  <hr />
                </div>
              ) : null }
              {sortedComments.length ? (
                <ul style={commentUlStyles}>
                  {sortedComments.map((comment) => {
                    return(
                      <li key={`comment-${comment.id}`} style={commentLiStyles}>
                        <p style={commentBodyStyles}>{comment.body}</p>
                        <hr style={hrStyles} />
                        <TimeAgo date={+comment.createdAt} style={timeAgoStyles} />
                        {currentUser && comment.author.id === currentUser.id ? (
                          <a href="#" style={deleteCommentStyles} data-comment-id={comment.id} onClick={this.handleDeleteComment.bind(this)}>
                            <i className="fa fa-trash"></i>
                          </a>
                        ) : null}
                        <span style={commentAuthorStyles}>{comment.author.username}</span>
                        <div style={clearStyles}></div>
                      </li>
                    )}
                  )}
                </ul>
              ) : <div style={noDataAvailableStyles}>There are no comments written yet</div> }
            </div>
          ) : <div style={noDataAvailableStyles}>Seems like this post is not available <br /><Link to="/">Go back</Link></div> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, { getPost, deletePost, createComment, deleteComment })(PostsShow);
