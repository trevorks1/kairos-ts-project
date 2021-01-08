import React, { Component } from 'react';

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

export default OrganizationProfile;
