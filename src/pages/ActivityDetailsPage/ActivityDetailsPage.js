import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL-UI
import {
  Container,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import ActivityDetailsCard from '../../components/ActivityDetailsCard/ActivityDetailsCard';

class ActivityDetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_POSTING',
      payload: this.props.match.params.id,
    });
  }

  handleBackBtnClick = () => {
    // pushes user back to the browse page using the stored id in backHistoryReducer as the filtering cause id
    this.props.history.push(`/browse/${this.props.store.backHistoryReducer}`);
  };
  render() {
    return (
      <Container>
        <Paper>
          <Grid container alignItems="center">
            <Grid item lg={6}>
              <Box ml={3}>
                <Grid item>
                  <h1>
                    {this.props.store.postings.postingDetails[0] &&
                      this.props.store.postings.postingDetails[0].title}
                  </h1>
                </Grid>
              </Box>
              <Box ml={3}>
                <Grid item>
                  <h3>
                    {this.props.store.postings.postingDetails[0] &&
                      this.props.store.postings.postingDetails[0]
                        .organization_name}
                  </h3>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Grid container alignItems="center" justify="space-evenly">
                <Grid item>
                  <Button variant="contained" onClick={this.handleBackBtnClick}>
                    BACK
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">I WANT TO HELP</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>
        <Box mt={6}>
          <Grid container>
            <Grid item lg={6}>
              <div>
                <img
                  src={process.env.PUBLIC_URL + '/org-placeholder.png'}
                  alt="not found"
                />
              </div>
              <Box mt={3}>
                <Typography variant="h4" component="h4">
                  Description:
                </Typography>
                <Typography variant="body1" component="p">
                  {this.props.store.postings.postingDetails[0] &&
                    this.props.store.postings.postingDetails[0].description}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6}>
              {this.props.store.postings.postingDetails[0] && (
                <ActivityDetailsCard
                  posting={this.props.store.postings.postingDetails[0]}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(ActivityDetailsPage));
