import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// MATERIAL-UI
import { Container, Box, Paper, Grid, Button } from '@material-ui/core';

class ActivityDetailsPage extends Component {
  state = {
    paramsId: 0,
    postingIndex: 0,
  };
  componentDidMount() {
    this.setState(
      {
        paramsId: this.props.match.params.id,
      },
      () => {
        for (
          let i = 0;
          i < this.props.store.postings.postingsForBrowsePage.length;
          i++
        )
          if (
            this.props.store.postings.postingsForBrowsePage[i].id ==
            this.state.paramsId
          ) {
            this.setState({
              postingIndex: i,
            });
          }
      }
    );
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
                    {this.props.store.postings &&
                      this.props.store.postings.postingsForBrowsePage[
                        this.state.postingIndex
                      ].location}
                  </h1>
                </Grid>
              </Box>
              <Box ml={3}>
                <Grid item>
                  <h3>
                    {this.props.store.postings &&
                      this.props.store.postings.postingsForBrowsePage[
                        this.state.postingIndex
                      ].organization_name}
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
            <Grid item>
              <h4>
                {this.props.store.postings &&
                  this.props.store.postings.postingsForBrowsePage[
                    this.state.postingIndex
                  ].description}
              </h4>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(ActivityDetailsPage));
