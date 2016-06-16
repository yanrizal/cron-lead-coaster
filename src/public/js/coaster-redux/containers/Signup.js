import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
import { signupPost } from '../actions/actions';
// import $ from 'jquery';


class Signup extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    console.log('signup click');
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    console.log(email,password);
    dispatch(signupPost(email,password));
  }

  render() {
    return (
        <div className="container">
          <h2 className="title">CREATE ACCOUNT</h2>
          <form className="form-signin">
            <label className="sr-only">Email</label>
            <input type="email" className="form-control" placeholder="Email" name="email" id="inputEmail" />
            <label className="sr-only">Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password" id="inputPassword" />
            <button onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block get-start">Continue</button>
            <label className="crt-acc" style={{textAlign:'center'}}>Terms & Conditions</label>
          </form>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { signupApi } = state;
  const { meta, isFetching } = signupApi.data || {
    meta: {},
    isFetching: false
  };
  return {
    meta,
    isFetching
  };
}

export default connect(mapStateToProps)(Signup);
