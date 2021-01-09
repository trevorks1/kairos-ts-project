import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Container,
} from '@material-ui/core';

class BrowsePage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });
  }

  handleCauseClick = () => {
    console.log('you clicked a cause!', this.props.store.causes.cause);
  };
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
                  <Card onClick={this.handleCauseClick}>
                    <CardActionArea>
                      <CardContent>
                        <h4>{item.cause}</h4>
                      </CardContent>
                    </CardActionArea>
                  </Card>
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
