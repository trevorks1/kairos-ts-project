import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegButtons from '../../components/RegButtons/RegButtons';

class LandingPage extends Component {
  state = {
    heading: 'Welcome to Kairos!',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <Grid
        container
        spacing={3}
        xs={12}
        direction
        row
        justify="center"
        alignItems="center"
        style={{ padding: 24 }}
      >
        <Grid item xs={12}>
          {this.state.heading}
        </Grid>
        <Grid container spacing={1} item xs alignItems="center">
          <Grid item xs>
            <RegButtons />
          </Grid>
        </Grid>
        <Grid item xs={12} justify="center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean
            vel elit scelerisque mauris pellentesque pulvinar pellentesque
            habitant morbi. Pharetra magna ac placerat vestibulum. Praesent
            tristique magna sit amet purus gravida quis blandit. Aenean euismod
            elementum nisi quis eleifend quam adipiscing. Mauris augue neque
            gravida in fermentum et sollicitudin. Pharetra sit amet aliquam id
            diam maecenas. Sed viverra tellus in hac. Fermentum posuere urna nec
            tincidunt praesent semper. Dictumst vestibulum rhoncus est
            pellentesque elit. Dolor magna eget est lorem ipsum. Ipsum
            suspendisse ultrices gravida dictum fusce ut placerat orci. Ut
            tellus elementum sagittis vitae et. Eget felis eget nunc lobortis.
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut ornare
            lectus sit amet. Tellus pellentesque eu tincidunt tortor aliquam
            nulla facilisi cras. Morbi quis commodo odio aenean sed adipiscing
            diam donec adipiscing.
          </p>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
