import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  Grid,
  Container,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import CauseListItem from '../../components/CauseListItem/CauseListItem';

class BrowseCausesPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });
  }

  handleSeeAllClick = () => {
    console.log('See All click!');

    // TODO push to BrowseActivitiesPage
    // should see ALL active activities!
  };

  render() {
    return (
      <div>
        <div className="banner">
          <h1>Find Your Cause</h1>
        </div>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <Card>
                <CardActionArea onClick={this.handleSeeAllClick}>
                  <CardContent>
                    <h4>See All</h4>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            {this.props.store.causes.map((item, index) => {
              return (
                <Grid item key={index} lg={3}>
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

export default connect(mapStoreToProps)(BrowseCausesPage);
