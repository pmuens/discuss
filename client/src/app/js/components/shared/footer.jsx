import React, { Component } from 'react';

const footerStyles = {
  borderTop: '1px solid #E1E1E1',
  padding: '10px',
  marginTop: '20px',
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  backgroundColor: 'white'
};

const centerTextStyles = {
  textAlign: 'center'
};

class Footer extends Component {
  render() {
    return (
      <footer style={footerStyles}>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <div style={centerTextStyles}>
                Runs completely serverless thanks to <a href="http://serverless.com" target="_blank">Serverless</a>
              </div>
              <div style={centerTextStyles}>
                Find the source code on <i className="fa fa-github"></i> <a href="https://github.com/JustServerless/discuss" target="_blank">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
