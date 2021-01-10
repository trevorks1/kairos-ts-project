import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import { Grid, Container } from '@material-ui/core';
import CauseListItem from '../../components/CauseListItem/CauseListItem';

class BrowsePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });
  }

  render() {
    return (
      <div>
        <div className="banner">
          <h1>Find Your Cause</h1>
        </div>
        <Container>
          <Grid container spacing={2}>
            {this.props.store.causes.map((item, index) => {
              return (
                <Grid item key={index} xl={3}>
                  <CauseListItem cause={item} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(BrowsePage);
