import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// MATERIAL UI
import { Card, CardContent, CardActionArea } from '@material-ui/core';

class CauseListItem extends Component {
  handleCauseClick = () => {
    this.props.dispatch({
      type: 'SET_BACK_HISTORY_SAGA',
      payload: this.props.cause.id,
    });
    this.props.history.push(`/browse/${this.props.cause.id}`);
  };

  render() {
    return (
      <Card>
        <CardActionArea onClick={this.handleCauseClick}>
          <CardContent>
            <h4>{this.props.cause.cause}</h4>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(connect()(CauseListItem));
