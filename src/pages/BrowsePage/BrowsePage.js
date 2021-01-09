import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BrowsePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });
  }
  render() {
    return (
      <div>
        <div className="banner">
          <h1>Find Your Cause</h1>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(BrowsePage);
