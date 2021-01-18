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
import { FavoriteBorder } from '@material-ui/icons';
import { withStyles, createStyles } from '@material-ui/core/styles';

// import for date/time configuration
import { DateTime } from 'luxon';

const muiStyles = (theme) =>
  createStyles({
    icons: {
      backgroundColor: theme.palette.primary.main,
    },
  });

class PostingCard extends Component {
  handlePostingClick = () => {
    console.log(this.props.posting);
    this.props.history.push(`/view-activity/${this.props.posting.id}`);
  };

  render() {
    const dateToAttend = DateTime.fromISO(this.props.posting.date_to_attend);
    const humanReadableAttendDate = dateToAttend.toLocaleString(
      DateTime.DATE_FULL
    );

    return (
      <Grid item lg={12}>
        {/* use avatar to display the number in top left corner */}
        <Card>
          <CardActionArea onClick={this.handlePostingClick}>
            {/* TODO - add light grey border under CardHeader! */}
            {/* TODO - replace number with heart icon. background color of avatar matches Kairos logo */}
            <CardHeader
              avatar={
                <Avatar className={this.props.classes.icons}>
                  <FavoriteBorder></FavoriteBorder>
                </Avatar>
              } // adding 1 to postingId because array index starts at 0!
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
                Attend Date: {humanReadableAttendDate}
                {/* TODO need to fix the date!!! */}
                {/* {this.props.posting.date_posted} */}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default withRouter(withStyles(muiStyles)(PostingCard));
