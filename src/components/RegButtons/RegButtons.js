import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>Register now as an Organization or Volunteer.</h2>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickOrganization}
            >
              Organization
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickVolunteer}
            >
              Volunteer
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RegButtons));
