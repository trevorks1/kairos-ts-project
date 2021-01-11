import React, { Component } from 'react';

// MATERIAL UI
import { Card, CardContent, CardActionArea } from '@material-ui/core';

class CauseListItem extends Component {
  handleCauseClick = () => {
    console.log(
      'you clicked a cause!',
      this.props.cause.cause,
      this.props.cause.id
    );
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

export default CauseListItem;
