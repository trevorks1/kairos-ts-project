import React, { Component } from 'react';

// MATERIAL-UI
import { Grid, Card, CardContent } from '@material-ui/core';

// import for date/time configuration
import { DateTime } from 'luxon';

class ActivityDetailsCard extends Component {
  render() {
    const datePosted = DateTime.fromISO(this.props.posting.date_posted);
    const humanReadablePostedDate = datePosted.toLocaleString(
      DateTime.DATE_SHORT
    );

    const dateToAttend = DateTime.fromISO(this.props.posting.date_to_attend);
    const humanReadableAttendDate = dateToAttend.toLocaleString(
      DateTime.DATE_SHORT
    );

    let repeating = 'NO';
    if (this.props.posting.repeating === true) {
      repeating = 'YES';
    }
    return (
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item lg={10}>
              <Grid container>
                <Grid item lg={12}>
                  <p>
                    <strong>WHEN</strong>
                  </p>
                  <p>{humanReadableAttendDate}</p>
                </Grid>
                <Grid item lg={12}>
                  <p>
                    <strong>WHERE</strong>
                  </p>
                  <p>{this.props.posting.location}</p>
                </Grid>
                <Grid item lg={12}>
                  <p>
                    <strong>DATE POSTED</strong>
                  </p>
                  <p>{humanReadablePostedDate}</p>
                </Grid>
                <Grid item lg={12}>
                  <p>
                    <strong>GOOD FOR</strong>
                  </p>
                  {/* need to map through age_ranges to display */}
                  {this.props.posting.age_ranges &&
                    this.props.posting.age_ranges.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })}
                </Grid>
                <Grid item lg={12}>
                  <p>
                    <strong>PEOPLE NEEDED</strong>
                  </p>
                  <p>{this.props.posting.people_needed}</p>
                </Grid>
                <Grid item lg={12}>
                  <p>
                    <strong>CURRENTLY SIGNED UP</strong>
                  </p>
                  <p>69</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2}>
              <Grid container>
                <Grid item lg={12}>
                  <p>
                    <strong>REPEATING</strong>
                  </p>
                  <p>{repeating}</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default ActivityDetailsCard;
