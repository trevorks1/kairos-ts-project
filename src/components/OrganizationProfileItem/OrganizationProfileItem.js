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

class OrganizationProfileItem extends Component {
  render() {
    return (
      <div>
        <Card
          variant="outlined"
          style={{
            padding: '25px',
            marginRight: '200px',
            marginLeft: '200px',
            marginBottom: '50px',
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Card
                style={{
                  height: '300px',
                  width: '230px',
                  marginLeft: '50px',
                  marginTop: '25px',
                }}
              >
                <CardHeader subheader="Logo" />
                <CardActionArea>
                  <img src={this.props.item.logo}></img>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                style={{
                  marginTop: '20px',
                  marginRight: '50px',
                  paddingBottom: '20px',
                  padding: '20px',
                }}
              >
                <CardHeader subheader="Organization Name" />
                {this.props.item.organization_name}
              </Card>
              <Card
                style={{
                  marginTop: '20px',
                  marginRight: '50px',
                  paddingBottom: '20px',
                  padding: '20px',
                }}
              >
                <CardHeader subheader="Organization Type" />
                {this.props.item.organization_type}
              </Card>
              <Card
                style={{
                  marginTop: '20px',
                  marginRight: '50px',
                  paddingBottom: '20px',
                  padding: '20px',
                }}
              >
                <CardHeader subheader="Summary" />
                {this.props.item.summary}
              </Card>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default connect()(OrganizationProfileItem);
