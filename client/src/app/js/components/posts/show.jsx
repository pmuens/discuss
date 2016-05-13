import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getPost, updatePost, deletePost } from '../../actions/posts';
import { createComment, updateComment, deleteComment } from '../../actions/comments';
import { Link } from 'react-router';
import _ from 'lodash';
import TimeAgo from 'react-timeago';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

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

const editPostStyles = {
  marginLeft: '10px',
  float: 'right'
};

const postAuthorStyles = {
  fontStyle: 'italic',
  float: 'right',
  color: '#B1B1B1'
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
  float: 'right',
  color: '#B1B1B1'
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
  fontStyle: 'italic',
  color: '#B1B1B1',
  float: 'left'
};

const gravatarStyles = {
  'height': '30px',
  'display': 'inline-block'
};

const md = new MarkdownIt({
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {
        // Don't fail
      }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
  },
});

class PostsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

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
    } else {
      alert('Please fill out all fields');
    }
  }

  handleEditPost(event) {
    event.preventDefault();

    this.setState({editing: true});
  }

  handleCancelEditPost(event) {
    event.preventDefault();

    this.setState({editing: false});
  }

  handleUpdatePost(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('data-post-id');
    const title = this.refs.title.value;
    const body = this.refs.body.value;

    if (title.length !== 0 && body.length !== 0) {
      const post = {
        id: id,
        title: title,
        body: body,
        jwt: this.props.currentUser.jwt
      };

      this.props.updatePost(post);

      this.setState({editing: false});

      this.props.post.title = title;
      this.props.post.body = body;

    } else {
      alert('You can not submit an empty title or empty body');
    }
  }

  handleDeletePost(event) {
    event.preventDefault();

    if (confirm('Do you really want to delete this post?')) {
      const post = {
        id: event.currentTarget.getAttribute('data-post-id'),
        jwt: this.props.currentUser.jwt
      };

      this.props.deletePost(post);
    }
  }

  handleDeleteComment(event) {
    event.preventDefault();

    if (confirm('Do you really want to delete this comment?')) {
      const comment = {
        id: event.currentTarget.getAttribute('data-comment-id'),
        jwt: this.props.currentUser.jwt
      };

      this.props.deleteComment(comment);
    }
  }

  handleUpdateComment(event) {
    const body = event.target.textContent;

    if (body.length !== 0) {
      const comment = {
        id: event.currentTarget.getAttribute('data-comment-id'),
        body,
        jwt: this.props.currentUser.jwt
      };

      this.props.updateComment(comment);
    } else {
      alert('You can not submit an empty comment');
      event.currentTarget.innerHTML = event.currentTarget.getAttribute('data-comment-body');
    }
  }

  isCurrentUserPostAuthor(post) {
    const { currentUser } = this.props;
    return currentUser && post.author.id === currentUser.id;
  }

  isCurrentUserCommentAuthor(comment) {
    const { currentUser } = this.props;
    return currentUser && comment.author.id === currentUser.id;
  }

  render() {
    const { post, comments, currentUser } = this.props;
    const { editing } = this.state;
    const sortedComments = post && comments.length ? _.orderBy(comments, 'createdAt', ['desc']) : [];

    return (
      <div className="row">
        <div className="twelve columns">
          {post ? (
            <div>
              <ul style={postUlStyles}>
                <li key={`post-${post.id}`} style={postLiStyles}>
                  {this.isCurrentUserPostAuthor(post) ? (
                    <h1 style={postTitleStyles} data-post-id={post.id}>
                      {editing ? (
                        <input className="u-full-width" ref="title" defaultValue={post.title}/>
                      ) : post.title}
                    </h1>
                  ) : <h1 style={postTitleStyles}>{post.title}</h1> }
                  <hr style={hrStyles}/>
                  {this.isCurrentUserPostAuthor(post) ? (
                    <p style={postBodyStyles} data-post-id={post.id}>
                      {editing ? (
                        <textarea className="u-full-width" ref="body" defaultValue={post.body}/>
                      ) : <div dangerouslySetInnerHTML={{ __html: md.render(post.body) }}></div>}
                    </p>
                  ) : <p style={postBodyStyles}>{post.body}</p> }
                  <hr style={hrStyles}/>
                  <TimeAgo date={+post.createdAt} style={timeAgoStyles}/>
                  {this.isCurrentUserPostAuthor(post) ? (
                    !editing ? (
                      <div>
                        <a href="#" style={deletePostStyles} data-post-id={post.id}
                           onClick={this.handleDeletePost.bind(this)}>
                          <i className="fa fa-trash"></i>
                        </a>
                        <a href="#" style={editPostStyles} data-post-id={post.id}
                           onClick={this.handleEditPost.bind(this)}>
                          <i className="fa fa-pencil-square-o"></i>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <a className="button" href="#" style={deletePostStyles} data-post-id={post.id}
                           onClick={this.handleCancelEditPost.bind(this)}>Cancel</a>
                        <a className="button button-primary" href="#" style={editPostStyles} data-post-id={post.id}
                           onClick={this.handleUpdatePost.bind(this)}>Save</a>
                      </div>
                    )
                  ) : null}
                  <span style={postAuthorStyles}><img style={gravatarStyles} src={post.author.gravatar} /> ● {post.author.username}</span>
                  <div style={clearStyles}></div>
                </li>
              </ul>
              <hr />
              {currentUser && !editing ? (
                <div>
                  <form onSubmit={this.handleCreateComment.bind(this)}>
                    <textarea style={textareaStyles} placeholder="Body" className="u-full-width" ref="body"></textarea>
                    <input type="submit" className="button button-primary" value="Submit comment"/>
                  </form>
                  <hr />
                </div>
              ) : null }
              {sortedComments.length ? (
                <ul style={commentUlStyles}>
                  {sortedComments.map((comment) => {
                      return (
                        <li key={`comment-${comment.id}`} style={commentLiStyles}>
                          {this.isCurrentUserCommentAuthor(comment) ? (
                            <p style={commentBodyStyles} data-comment-id={comment.id} data-comment-body={comment.body}
                               contentEditable="true" onBlur={this.handleUpdateComment.bind(this)}>{comment.body}</p>
                          ) : <p style={commentBodyStyles}>{comment.body}</p>}
                          <hr style={hrStyles}/>
                          <TimeAgo date={+comment.createdAt} style={timeAgoStyles}/>
                          {this.isCurrentUserCommentAuthor(comment) ? (
                            <a href="#" style={deleteCommentStyles} data-comment-id={comment.id}
                               onClick={this.handleDeleteComment.bind(this)}>
                              <i className="fa fa-trash"></i>
                            </a>
                          ) : null}
                          <span style={commentAuthorStyles}><img style={gravatarStyles} src={comment.author.gravatar} /> ● {comment.author.username}</span>
                          <div style={clearStyles}></div>
                        </li>
                      )
                    }
                  )}
                </ul>
              ) : <div style={noDataAvailableStyles}>There are no comments written yet</div> }
            </div>
          ) : <div style={noDataAvailableStyles}>Seems like this post is not available <br /><Link to="/">Go back</Link>
          </div> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
    comments: state.comments.comments,
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, {
  getPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment
})(PostsShow);
