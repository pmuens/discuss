import React, { Component } from 'react';
import { Link } from 'react-router';

const needToSignInStyles = {
  textAlign: 'center'
};

const textareaStyles = {
  height: '100px'
};

const headlineStyles = {
  textAlign: 'center'
};

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    const { body } = props;

    if(body){
      this.state = { body: body };
    }else{
      this.state = { body: '' };
    }
  }

  onChangeBody(event) {
    this.setState({body: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmitForm(this.state);
    this.setState({ body: '' });
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) return (
      <div style={needToSignInStyles}>
        <span>You need to </span><Link to="/sign-in">sign in</Link> <span>to create a new comment</span>
      </div>
    );

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <textarea style={textareaStyles} placeholder="Body" className="u-full-width" onChange={this.onChangeBody.bind(this)} value={this.state.body}></textarea>
          <input type="submit" className="button button-primary" value="Create comment" />
        </form>
      </div>
    );
  }
}
