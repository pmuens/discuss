import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';
import { Link } from 'react-router';

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
  marginBottom: '0px',
  float: 'left'
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

const commentAuthorStyles = {
  fontStyle: 'italic',
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

class PostsShow extends Component {
  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="row">
        <div className="twelve columns">
          {post ? (
            <div>
              <ul style={postUlStyles}>
                <li key={`post-${post.id}`} style={postLiStyles}>
                  <h1 style={postTitleStyles}>{post.title}</h1>
                  <span style={postAuthorStyles}>{post.author.username}</span>
                  <div style={clearStyles}></div>
                  <hr style={hrStyles}/>
                  <p style={postBodyStyles}>{post.body}</p>
                  <div style={clearStyles}></div>
                </li>
              </ul>
              <hr />
              {post.comments.length ? (
                <ul style={commentUlStyles}>
                  {post.comments.map((comment) => {
                    return(
                      <li key={`comment-${comment.id}`} style={commentLiStyles}>
                        {comment.body}
                        <hr style={hrStyles} />
                        <span style={commentAuthorStyles}>{comment.author.username}</span>
                        <div style={clearStyles}></div>
                      </li>
                    )}
                  )}
                </ul>
              ) : <div style={noDataAvailableStyles}>There are now comments written yet</div> }
            </div>
          ) : <div style={noDataAvailableStyles}>Seems like this post is not available <br /><Link to="/">Go back</Link></div> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { getPost })(PostsShow);
