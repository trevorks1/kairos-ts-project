import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterFormVolunteer from '../../components/VolunteerForm/VolunteerForm';

class RegisterVolunteer extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterFormVolunteer />
        {/* TODO - add the register and cancel function to page */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterVolunteer);
