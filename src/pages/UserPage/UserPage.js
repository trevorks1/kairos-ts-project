import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButton from '../../components/LogOutButton/LogOutButton';

// CUSTOM COMPONENTS
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import OrganizationProfile from '../../components/OrganizationProfile/OrganizationProfile';
import VolunteerProfile from '../../components/VolunteerProfile/VolunteerProfile';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        {this.props.store.user.access_level_id === 1 && <AdminPanel />}
        {this.props.store.user.access_level_id === 2 && <OrganizationProfile />}
        {this.props.store.user.access_level_id === 3 && <VolunteerProfile />}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
