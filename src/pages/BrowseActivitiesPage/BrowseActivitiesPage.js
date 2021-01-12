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
  Card,
  CardContent,
} from '@material-ui/core';

class BrowseActivitiesPage extends Component {
  state = {
    selectedCauseId: 0,
    selectedActivityId: 0,
    selectedAgeRangeId: 0,
  };

  componentDidMount() {
    console.log(this.props.match.params.id);

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
    this.setState(
      {
        selectedCauseId: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleActivityChange = (e) => {
    this.setState(
      {
        selectedActivityId: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleAgeChange = (e) => {
    this.setState(
      {
        selectedAgeRangeId: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  render() {
    return (
      <Container>
        <h1>Browse these activities!</h1>
        <Grid container spacing={2}>
          <Grid item xl={4}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Cause Type</InputLabel>
              <Select
                value={this.state.selectedCauseId}
                onChange={this.handleCauseChange}
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.causes.map((item, index) => {
                  return <MenuItem value={item.id}>{item.cause}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={4}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={this.state.selectedActivityId}
                onChange={this.handleActivityChange}
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.activities.activityList.map((item, index) => {
                  return (
                    <MenuItem value={item.id}>{item.activity_name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={4}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Age Range</InputLabel>
              <Select
                value={this.state.selectedAgeRangeId}
                onChange={this.handleAgeChange}
              >
                <MenuItem value={0}>-please select-</MenuItem>
                {this.props.store.ages.map((item, index) => {
                  return <MenuItem value={item.id}>{item.range}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={12}>
            <Card>
              <CardContent>
                <h2>HELLO</h2>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(BrowseActivitiesPage);
