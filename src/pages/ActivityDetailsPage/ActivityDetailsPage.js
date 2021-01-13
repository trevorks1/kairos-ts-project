import React, { Component } from 'react';

// MATERIAL-UI
import { Container, Box, Paper, Grid, Button } from '@material-ui/core';

class ActivityDetailsPage extends Component {
  render() {
    return (
      <Container>
        <Paper>
          <Grid container alignItems="center">
            <Grid item lg={6}>
              <Box ml={3}>
                <Grid item>
                  <h1>Activity Name</h1>
                </Grid>
              </Box>
              <Box ml={3}>
                <Grid item>
                  <h3>Organization Name</h3>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Grid container alignItems="center" justify="space-evenly">
                <Grid item>
                  <Button variant="contained">BACK</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">I WANT TO HELP</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default ActivityDetailsPage;
