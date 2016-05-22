import React, { Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import _ from 'lodash';

const ulStyles = {
  marginBottom: '10px'
};

const noDataAvailableStyles = {
  marginTop: '20px',
  textAlign: 'center'
};

const liStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  listStyle: 'none'
};

const titleStyles = {
  fontSize: '20px',
  marginBottom: '0px'
};

const titleLinkStyles = {
  textDecoration: 'none'
};

const authorStyles = {
  fontStyle: 'italic',
  float: 'right',
  color: '#B1B1B1'
};

const hrStyles = {
  margin: '10px 0px'
};

const commentsStyles = {
  float: 'left'
};

const timeSeparatorStyles = {
  margin: '0px 5px'
};

const timeAgoStyles = {
  fontStyle: 'italic',
  color: '#B1B1B1'
};

const clearStyles = {
  clear: 'both'
};

const gravatarStyles = {
  'height': '30px',
  'display': 'inline-block'
};

export default class Posts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;

    const sortedPosts = posts.length ? _.orderBy(posts, 'createdAt', ['desc']) : [];

    return (
      <div className="row">
        <div className="twelve columns">
          {sortedPosts.length ? (
            <ul style={ulStyles}>
              {sortedPosts.map((post) => {
                  return (
                    <li key={`post-${post.id}`} style={liStyles}>
                      <h1 style={titleStyles}>
                        <Link to={`posts/${post.id}/show`}
                              style={titleLinkStyles}>{post.title}
                        </Link>
                      </h1>
                      <hr style={hrStyles}/>
                      <span style={commentsStyles}>{post.comments.length} Comment(s)</span>
                      <span style={timeSeparatorStyles}>
                        - <TimeAgo date={+post.createdAt} style={timeAgoStyles}/>
                      </span>
                      <span style={authorStyles}>
                        <img style={gravatarStyles}
                             src={post.author.gravatar}/> ● {post.author.username}
                      </span>
                      <div style={clearStyles}></div>
                    </li>
                  )
                }
              )}
            </ul>
          ) : <div style={noDataAvailableStyles}>There are currently no posts available to display</div> }
        </div>
      </div>
    )
  }
}