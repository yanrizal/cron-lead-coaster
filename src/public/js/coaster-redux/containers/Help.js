import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
// import { fetchPosts, selectedFilter } from '../actions/actions';
// import $ from 'jquery';


class Help extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <h1>How to create a coaster video</h1>
        </div>
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

export default connect(mapStateToProps)(Help);
