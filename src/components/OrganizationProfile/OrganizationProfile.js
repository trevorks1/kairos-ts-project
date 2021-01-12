import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class OrganizationProfile extends Component {
  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome to your Organization Profile Page,{' '}
          {this.props.store.user.username}!
        </h1>
        <p>Your ID is: {this.props.store.user.id}</p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(OrganizationProfile);
