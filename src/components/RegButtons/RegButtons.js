import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

class RegButtons extends Component {
  // On click event for Organization and Volunteer buttons
  handleClickOrganization = (event) => {
    this.props.history.push('/registration');
  };

  handleClickVolunteer = (event) => {
    console.log('Getting inside the function?');
    this.props.history.push('/registration-volunteer');
  };

  render() {
    return (
      <div className="formPanel">
        <h2>Register now as an Organization or Volunteer.</h2>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOrganization}
          >
            Organization
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickVolunteer}
          >
            Volunteer
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RegButtons));
