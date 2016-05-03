import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Link } from 'react-router';

const ulStyles = {
  marginBottom: '10px'
};

const liStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  listStyle: 'none'
};

const titleStyles = {
  fontSize: '20px',
  marginBottom: '0px',
  float: 'left'
};

const titleLinkStyles = {
  textDecoration: 'none'
};

const authorStyles = {
  fontStyle: 'italic',
  float: 'right'
};

const hrStyles = {
  margin: '10px 0px'
};

const commentsStyles = {
  float: 'left'
};

const clearStyles = {
  clear: 'both'
};

const noDataAvailableStyles = {
  marginTop: '20px',
  textAlign: 'center'
};

class PostsIndex extends Component {
  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="row">
        <div className="twelve columns">
          {posts.length ? (
            <ul style={ulStyles}>
              {posts.map((post) => {
                return (
                  <li key={`post-${post.id}`} style={liStyles}>
                    <h1 style={titleStyles}><Link to={`posts/${post.id}/show`} style={titleLinkStyles}>{post.title}</Link></h1>
                    <span style={authorStyles}>{post.author.username}</span>
                    <div style={clearStyles}></div>
                    <hr style={hrStyles}/>
                    <span style={commentsStyles}>{post.comments.length} Comment(s)</span>
                    <div style={clearStyles}></div>
                  </li>
                )}
              )}
            </ul>
          ) : <div style={noDataAvailableStyles}>There are currently no posts available to display</div> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.posts };
}

export default connect(mapStateToProps, { getPosts })(PostsIndex);
