import React, { Component } from 'react';
import { Link } from 'react-router';

const needToSignInStyles = {
  textAlign: 'center'
};

const textareaStyles = {
  height: '300px'
};

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    const { title, body } = props;

    if(title && body){
      this.state = { title: title, body: body };
    }else{
      this.state = { title: '', body: '' };
    }
  }

  onChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  onChangeBody(event) {
    this.setState({body: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmitForm(this.state);
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) return (
      <div style={needToSignInStyles}>
        <span>You need to </span><Link to="/sign-in">sign in</Link> <span>to create a new post</span>
      </div>
    );

    return (
      <div className="row">
        <div className="eight columns offset-by-two">
          <form onSubmit={this.onSubmit.bind(this)}>
            <h1>New post</h1>
            <input type="text" placeholder="Title" className="u-full-width" onChange={this.onChangeTitle.bind(this)} value={this.state.title} />
            <textarea style={textareaStyles} placeholder="Body" className="u-full-width" onChange={this.onChangeBody.bind(this)} value={this.state.body}></textarea>
            <input type="submit" className="button button-primary" value="Create post" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}
