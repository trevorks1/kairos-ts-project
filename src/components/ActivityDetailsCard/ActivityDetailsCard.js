import React, { Component } from 'react';

// MATERIAL-UI
import { Grid, Card, CardContent } from '@material-ui/core';

class ActivityDetailsCard extends Component {
  render() {
    return (
      <Card>
        <CardContent>{this.props.posting.location}</CardContent>
      </Card>
    );
  }
}

export default ActivityDetailsCard;
