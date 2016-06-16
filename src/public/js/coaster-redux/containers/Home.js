import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { routeActions } from 'react-router-redux';
// import { fetchPosts, selectedFilter } from '../actions/actions';
// import $ from 'jquery';


class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <table className="table"> 
          <caption>Active Coasters</caption>
        <thead> 
          <tr>  
            <th>Name</th> 
            <th>Search Link</th> 
            <th>Profile Visits</th>
            <th>Leads</th>
            <th></th>
          </tr> 
        </thead> 
        <tbody> 
          <tr> 
            <th scope="row">Recruiting</th> 
            <td>linkedin...</td> 
            <td>500/3800</td>
            <td>SS</td>
            <td>pause</td>
          </tr>
          <tr> 
            <th scope="row">Recruiting</th> 
            <td>linkedin...</td> 
            <td>500/3800</td>
            <td>SS</td>
            <td>pause</td>
          </tr>
          <tr> 
            <th scope="row">Recruiting</th> 
            <td>linkedin...</td> 
            <td>500/3800</td>
            <td>SS</td>
            <td>pause</td>
          </tr>
        </tbody> 
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postsByApi } = state;
  const { meta, isFetching } = postsByApi.data || {
    meta: {},
    isFetching: false
  };
  return {
    meta,
    isFetching
  };
}

export default connect(mapStateToProps)(Home);
