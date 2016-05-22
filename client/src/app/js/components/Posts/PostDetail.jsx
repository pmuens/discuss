import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import _ from 'lodash';
import TimeAgo from 'react-timeago';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import Textarea from 'react-textarea-autosize';

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
  html: true,
  breaks: true,
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

export default class PostDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, isAuthor } = this.props;

    return (
      <div className="row">
        <div className="twelve columns">
          {post ? (
            <div>
              <ul style={postUlStyles}>
                <li key={`post-${post.id}`} style={postLiStyles}>
                  <h1 style={postTitleStyles}>{post.title}</h1>
                  <hr style={hrStyles}/>
                  <div dangerouslySetInnerHTML={{ __html: md.render(post.body) }}></div>
                  <hr style={hrStyles}/>
                  <TimeAgo date={+post.createdAt} style={timeAgoStyles}/>
                  {isAuthor ? (
                    <div>
                      <a href="#" style={deletePostStyles} data-post-id={post.id}
                      >
                        <i className="fa fa-trash"></i>
                      </a>
                      <a href="#" style={editPostStyles} data-post-id={post.id}
                      >
                        <i className="fa fa-pencil-square-o"></i>
                      </a>
                    </div>
                  ) : null}
                  <span style={postAuthorStyles}><img style={gravatarStyles}
                                                      src={post.author.gravatar}/> ● {post.author.username}</span>
                  <div style={clearStyles}></div>
                </li>
              </ul>
            </div>
          ) : <div style={noDataAvailableStyles}>Seems like this post is not available <br /><Link to="/">Go back</Link>
          </div> }
        </div>
      </div>
    );
  }
}