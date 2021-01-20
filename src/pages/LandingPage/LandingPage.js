import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Card, Paper, Box, CardContent } from '@material-ui/core';
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
        <h1 className="heading-lp">
          Welcome to <span className="heading-kairos">Kairos!</span>
        </h1>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={10}>
            <Paper>
              <Box p={3}>
                <RegButtons />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={5}>
              <img src="volunteer.jpg" />
            </Grid>
            <Grid item xs={5}>
              <Card>
                <CardContent>
                  <p>
                    Maybe it’s because I like everything to be super organized,
                    but I love when nonprofit websites have a Get Involved
                    section. There’s something to be said for giving people
                    options, and for keeping them all in one place. It makes
                    life so much easier. Basically, the mission is the purpose
                    for which the agency exists. It is not a list of what you do
                    but is rather a declaration of what you want to accomplish
                    (e.g., eradicate hunger in our community, end violence among
                    our youth). Being clear about the organization’s mission is
                    critical to deciding how volunteers will be involved to
                    support that mission.
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(muiStyles)(LandingPage));
