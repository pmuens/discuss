import React, { Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import _ from 'lodash';

const hrStyles = {
  margin: '10px 0px'
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

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comment, isAuthor } = this.props;

    return (
      <li style={commentLiStyles}>
        <p style={commentBodyStyles}>{comment.body}</p>
        <hr style={hrStyles}/>
        <TimeAgo date={+comment.createdAt} style={timeAgoStyles}/>
        {isAuthor ? (
          <a href="#" style={deleteCommentStyles} data-comment-id={comment.id}
          > <i className="fa fa-trash"></i>
          </a>
        ) : null}
              <span style={commentAuthorStyles}>
                <img style={gravatarStyles}
                     src={comment.author.gravatar}/>
                ● {comment.author.username}
              </span>
        <div style={clearStyles}></div>
      </li>
    )
  }
}