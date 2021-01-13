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
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
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
      type: 'GET_POSTINGS_FOR_SELECTED_CAUSE',
      payload: this.props.match.params.id,
    });

    this.props.dispatch({
      type: 'GET_CAUSES',
    });

    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });

    this.props.dispatch({
      type: 'GET_AGES',
    });
  }

  handleCauseChange = (e) => {
    this.setState({
      cause_id: e.target.value,
    });
  };

  handleActivityChange = (e) => {
    this.setState({
      activity_id: e.target.value,
    });
  };

  handleAgeChange = (e) => {
    this.setState({
      age_id: e.target.value,
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
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Cause Type</InputLabel>
              <Select
                value={this.state.selectedCauseId}
                onChange={this.handleCauseChange}
                variant="outlined"
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.causes.map((item) => {
                  return <MenuItem value={item.id}>{item.cause}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={this.state.selectedActivityId}
                onChange={this.handleActivityChange}
                variant="outlined"
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
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Age Range</InputLabel>
              <Select
                value={this.state.selectedAgeRangeId}
                onChange={this.handleAgeChange}
                variant="outlined"
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.ages.map((item) => {
                  return <MenuItem value={item.id}>{item.range}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <Button variant="contained" onClick={this.clickHandleSubmit}>
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
