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
          <CardHeader avatar={<Avatar>1</Avatar>} title="Activity Title" />
          <CardContent>
            <p>Activity Description</p>
          </CardContent>
          <CardActions>
            <p>Date Posted: 01.01.2021</p>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default PostingCard;
