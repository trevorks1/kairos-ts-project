import React, { Component } from 'react';

// MATERIAL-UI
import {
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@material-ui/core';

class PostingCard extends Component {
  render() {
    return (
      <Grid item xl={12}>
        {/* use avatar to display the number in top left corner */}
        <Card>
          <CardHeader
            avatar={<Avatar>{this.props.postingId + 1}</Avatar>} // adding 1 to postingId because array index starts at 0!
            title={this.props.posting.organization_name}
          />
          <CardContent>{this.props.posting.description}</CardContent>
          <CardActions>{this.props.posting.date_posted}</CardActions>
        </Card>
      </Grid>
    );
  }
}

export default PostingCard;
