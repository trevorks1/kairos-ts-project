import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Card, Paper, Box } from '@material-ui/core';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegButtons from '../../components/RegButtons/RegButtons';

// Material-UI styles
const muiStyles = (theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontsize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class LandingPage extends Component {
  state = {
    heading: 'Welcome to Kairos!',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <h2>{this.state.heading}</h2>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={10}>
            <Paper>
              <Box p={3}>
                <RegButtons />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean vel
          elit scelerisque mauris pellentesque pulvinar pellentesque habitant
          morbi. Pharetra magna ac placerat vestibulum. Praesent tristique magna
          sit amet purus gravida quis blandit. Aenean euismod elementum nisi
          quis eleifend quam adipiscing. Mauris augue neque gravida in fermentum
          et sollicitudin. Pharetra sit amet aliquam id diam maecenas. Sed
          viverra tellus in hac. Fermentum posuere urna nec tincidunt praesent
          semper. Dictumst vestibulum rhoncus est pellentesque elit. Dolor magna
          eget est lorem ipsum. Ipsum suspendisse ultrices gravida dictum fusce
          ut placerat orci. Ut tellus elementum sagittis vitae et. Eget felis
          eget nunc lobortis. Lorem ipsum dolor sit amet consectetur adipiscing
          elit. Ut ornare lectus sit amet. Tellus pellentesque eu tincidunt
          tortor aliquam nulla facilisi cras. Morbi quis commodo odio aenean sed
          adipiscing diam donec adipiscing.
        </p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(muiStyles)(LandingPage));
