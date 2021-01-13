import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MATERIAL-UI
import {
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';

class PostingCard extends Component {
  handlePostingClick = () => {
    console.log(this.props.posting.id);
    this.props.history.push(`/view-activity/${this.props.posting.id}`);
  };

  render() {
    return (
      <Grid item lg={12}>
        {/* use avatar to display the number in top left corner */}
        <Card>
          <CardActionArea onClick={this.handlePostingClick}>
            <CardHeader
              avatar={<Avatar>{this.props.postingId + 1}</Avatar>} // adding 1 to postingId because array index starts at 0!
              title={
                <Typography variant="h3" component="h3">
                  {this.props.posting.title}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="body1" component="p">
                {this.props.posting.description}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" component="p">
                {this.props.posting.date_posted}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default withRouter(PostingCard);
