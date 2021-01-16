import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { DateTime } from 'luxon';

class OrganizationProfileItem extends Component {
  markComplete = (event) => {
    this.props.dispatch({
      type: 'PUT_ACTIVITY_COMPLETE',
      payload: this.props.item.id,
    });
  };

  render() {
    const datePosted = DateTime.fromISO(this.props.item.date_posted);
    const humanReadablePostedDate = datePosted.toLocaleString(
      DateTime.DATE_SHORT
    );

    return (
      <div>
        {' '}
        <Grid item lg={12}>
          {/* use avatar to display the number in top left corner */}
          <Card
            variant="outlined"
            style={{
              marginBottom: '25px',
              marginRight: '100px',
              marginLeft: '100px',
            }}
          >
            <CardActionArea onClick={this.handlePostingClick}>
              <CardHeader
                avatar={<Avatar>{this.props.item.id}</Avatar>} // adding 1 to postingId because array index starts at 0!
                title={
                  <Typography variant="h3" component="h3">
                    {this.props.item.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1" component="p">
                  {this.props.item.description}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body2" component="p">
                  {humanReadablePostedDate}
                  {/* TODO need to fix the date!!! */}
                  {/* {this.props.posting.date_posted} */}
                </Typography>
                <Button
                  style={{ float: 'right', marginLeft: '20px' }}
                  color="primary"
                  onClick={this.markComplete}
                >
                  Mark as Complete
                </Button>
                <Button style={{ float: 'right' }}>Edit</Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default connect()(OrganizationProfileItem);
