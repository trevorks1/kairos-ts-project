import React, { Component } from 'react';

// MATERIAL-UI
import {
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
} from '@material-ui/core';

class PostingCard extends Component {
  handlePostingClick = () => {
    console.log(this.props.posting.id);
  };

  render() {
    return (
      <Grid item xl={12}>
        {/* use avatar to display the number in top left corner */}
        <Card>
          <CardActionArea onClick={this.handlePostingClick}>
            <CardHeader
              avatar={<Avatar>{this.props.postingId + 1}</Avatar>} // adding 1 to postingId because array index starts at 0!
              title={this.props.posting.organization_name}
            />
            <CardContent>{this.props.posting.description}</CardContent>
            <CardActions>{this.props.posting.date_posted}</CardActions>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default PostingCard;
