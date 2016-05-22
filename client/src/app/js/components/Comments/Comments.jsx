import React, { Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import _ from 'lodash';
import Comment from './Comment';

const noDataAvailableStyles = {
  marginTop: '20px',
  textAlign: 'center'
};

const headlineStyles = {
  textAlign: 'center'
};

const commentUlStyles = {marginBottom: '10px'};

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }

  isCurrentUserAuthor(authorId) {
    const { currentUser } = this.props;
    return currentUser && authorId === currentUser.id
  }

  render() {
    const { comments } = this.props;

    const sortedComments = comments.length ? _.orderBy(comments, 'createdAt', ['desc']) : [];

    if (!sortedComments.length) {
      return (
        <div style={noDataAvailableStyles}>There are no comments written yet</div>
      );
    }

    return (
      <div>
        <h4 style={headlineStyles}>Comments</h4>
        <ul style={commentUlStyles}>
          {sortedComments.map((comment) => {
            return (
              <Comment
                key={`comment-${comment.id}`}
                comment={ comment }
                isAuthor={ this.isCurrentUserAuthor(comment.author.id) }
              />
            )
          })}
        </ul>
      </div>
    )
  }
}