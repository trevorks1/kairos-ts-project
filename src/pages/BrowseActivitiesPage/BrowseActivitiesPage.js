import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

// CUSTOM COMPONENTS
import PostingCard from '../../components/PostingCard/PostingCard';

class BrowseActivitiesPage extends Component {
  state = {
    cause_id: 0,
    activity_id: 0,
    age_id: 0,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });

    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });

    this.props.dispatch({
      type: 'GET_AGES',
    });
    if (
      parseInt(this.props.match.params.id) > 0 &&
      this.props.match.params.id != 8080
    ) {
      this.setState(
        {
          cause_id: parseInt(this.props.match.params.id),
        },
        () => {
          this.props.dispatch({
            type: 'SUBMIT_FILTERS',
            payload: this.state,
          });
        }
      );
    } else if (this.props.match.params.id == 8080) {
      // if params.id = 8080 then it's volunteer user coming from their
      // profile page so we don't want to resubmit filters!
      return;
    } else {
      this.props.dispatch({
        type: 'SUBMIT_FILTERS',
        payload: this.state,
      });
    }
    this.props.dispatch({
      type: 'CLEAR_POSTING_DETAILS',
    });
  }

  // combining handleChange functions!
  handleChangeFor = (propertyName) => (e) => {
    this.setState({
      [propertyName]: e.target.value,
    });
  };

  clickHandleSubmit = () => {
    this.props.dispatch({
      type: 'SUBMIT_FILTERS',
      payload: this.state,
    });
  };
  render() {
    return (
      <Container>
        <h1>Browse these activities!</h1>
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={3}>
            <FormControl fullWidth>
              <InputLabel>Cause Type</InputLabel>
              <Select
                value={this.state.selectedCauseId}
                onChange={this.handleChangeFor('cause_id')}
                variant="outlined"
                fullWidth
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.causes.map((item) => {
                  return <MenuItem value={item.id}>{item.cause}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl fullWidth>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={this.state.selectedActivityId}
                onChange={this.handleChangeFor('activity_id')}
                variant="outlined"
                fullWidth
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.activities.activityList.map((item) => {
                  return (
                    <MenuItem value={item.id}>{item.activity_name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl fullWidth>
              <InputLabel>Age Range</InputLabel>
              <Select
                value={this.state.selectedAgeRangeId}
                onChange={this.handleChangeFor('age_id')}
                variant="outlined"
                fullWidth
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.ages.map((item) => {
                  return <MenuItem value={item.id}>{item.range}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <Button
              variant="contained"
              onClick={this.clickHandleSubmit}
              size="large"
            >
              SUBMIT
            </Button>
          </Grid>
          {this.props.store.postings.postingsForBrowsePage.map(
            (item, index) => {
              return <PostingCard posting={item} postingId={index} />;
            }
          )}
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(BrowseActivitiesPage);
