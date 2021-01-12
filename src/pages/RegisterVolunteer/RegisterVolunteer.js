import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../../components/OrganizationForm/OrganizationForm';

class RegisterVolunteer extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        {/* TODO need to create volunteer form */}

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterVolunteer);
