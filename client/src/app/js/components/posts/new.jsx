import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/posts';
import { Link } from 'react-router';

const needToSignInStyles = {
  textAlign: 'center'
};

const textareaStyles = {
  height: '300px'
};

class PostsNew extends Component {
  handleCreatePost(event) {
    event.preventDefault();

    const title = this.refs.title.value;
    const body = this.refs.body.value.replace(/(?:\r\n|\r|\n)/g, '<br />');

    if (title.length !== 0 && body.length !== 0) {
      const post = {
        title,
        body,
        jwt: this.props.currentUser.jwt
      };

      this.props.createPost(post);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    const { currentUser } = this.props;

    if (!currentUser) return (
      <div style={needToSignInStyles}>
        <span>You need to </span><Link to="/sign-in">sign in</Link> <span>to create a new post</span>
      </div>
    );

    return (
      <div className="row">
        <div className="eight columns offset-by-two">
          <form onSubmit={this.handleCreatePost.bind(this)}>
            <h1>New post</h1>
            <input type="text" placeholder="Title" className="u-full-width" ref="title" />
            <textarea style={textareaStyles}  placeholder="Body" className="u-full-width" ref="body"></textarea>
            <input type="submit" className="button button-primary" value="Create post" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps, { createPost })(PostsNew);
