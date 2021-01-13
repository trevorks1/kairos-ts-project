import React, { Component } from 'react';

// MATERIAL-UI
import { Grid, Card, CardContent } from '@material-ui/core';

class ActivityDetailsCard extends Component {
  render() {
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
                  <p>{this.props.posting.date_to_attend}</p>
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
                  <p>{this.props.posting.date_posted}</p>
                </Grid>
                <Grid item lg={12}>
                  <p>
                    <strong>GOOD FOR</strong>
                  </p>
                  {/* need to map through age_ranges */}
                  <p>{this.props.posting.location}</p>
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
                  {/* need to set up conditional check for boolean and then display yes/no */}
                  <p>{this.props.posting.repeating}</p>
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
