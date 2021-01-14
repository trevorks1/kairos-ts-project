import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import { Container, Grid, Paper, Typography, Button } from '@material-ui/core';

class VolunteerProfile extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PREF_ACTIVITIES',
    });
  }
  render() {
    return (
      <Container>
        <Grid container spacing={2}>
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
          <Grid item lg={12}>
            <Grid container>
              <Grid item>
                <Typography variant="h3" component="h3">
                  Hello {this.props.store.user.first_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={5}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography variant="h5" component="h5">
                      EMAIL
                    </Typography>
                    <Typography variant="body1" component="p">
                      {this.props.store.user.email_address}
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Typography variant="h5" component="h5">
                      PHONE
                    </Typography>
                    <Typography variant="body1" component="p">
                      {this.props.store.user.phone_number}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={7}>
                <Typography variant="h5" component="h5">
                  MY PREFERRED ACTIVITY TYPES
                </Typography>
                {/* map through preferred activities */}
                {this.props.store.activities.prefActivityList.map(
                  (item, index) => {
                    return (
                      <Typography variant="body1" component="p" key={index}>
                        {item.activity_name}
                      </Typography>
                    );
                  }
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(VolunteerProfile);
