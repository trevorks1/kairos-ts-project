import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../../components/OrganizationForm/OrganizationForm';

class RegisterOrganization extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterForm />
        {/* TODO - add the register and cancel function to page */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterOrganization);
