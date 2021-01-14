import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import { Container, Grid, Paper, Typography } from '@material-ui/core';

class VolunteerProfile extends Component {
  render() {
    return (
      <Container>
        <Grid container>
          <Grid item lg={12}>
            <Paper elevation={2}>
              <Typography variant="h2" component="h2" align="center">
                Thank you for being a volunteer
              </Typography>
              <Typography variant="h2" component="h2" align="center">
                We appreciate you!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(VolunteerProfile);
