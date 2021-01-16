import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import OrganizationProfileItem from '../OrganizationProfileItem/OrganizationProfileItem';

class OrganizationProfile extends Component {
  state = {
    newPost: false,
  };

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  makeActivity = (event) => {
    if (this.state.newPost === false) {
      this.setState({
        newPost: true,
      });
    } else if (this.state.newPost === true) {
      this.setState({
        newPost: false,
      });
    }
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_ORG_PROFILE' });
  }

  render() {
    let org;
    let post;

    if (this.props.store.orgProfileReducer.org != undefined) {
      org = this.props.store.orgProfileReducer.org;
    }

    if (this.props.store.orgProfileReducer.post != undefined) {
      post = this.props.store.orgProfileReducer.post;
    }

    let postForm = <></>;
    if (this.state.newPost === true) {
      postForm = (
        <Card
          variant="outlined"
          style={{
            width: '700px',
            margin: 'auto',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <h3>New Activity Opportunity</h3>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6} style={{ margin: 'auto' }}>
              <TextField
                required
                type="text"
                onChange={this.handleChangeFor('header')}
                id="standard-textarea"
                variant="outlined"
                label="Header"
                placeholder="Header"
                multiline
                style={{
                  width: '90%',
                  marginTop: '25px',
                  marginBottom: '20px',
                }}
              />
              <div>
                <TextField
                  required
                  type="text"
                  onChange={this.handleChangeFor('project_desc')}
                  id="standard-textarea"
                  variant="outlined"
                  label="Description"
                  placeholder="Description"
                  multiline
                  style={{
                    width: '90%',
                    marginTop: '25px',
                    marginBottom: '20px',
                  }}
                />
              </div>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  type="text"
                  onChange={this.handleChangeFor('project_link')}
                  id="standard-textarea"
                  variant="outlined"
                  label="Link"
                  placeholder="Project Link"
                  multiline
                  style={{
                    width: '90%',
                    marginTop: '25px',
                    marginBottom: '20px',
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                style={{ marginBottom: '20px' }}
                variant="contained"
                color="primary"
                onClick={this.postProject}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      );
    }

    return (
      <div>
        {org && (
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
                    <img src={org.logo}></img>
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
                  {org.organization_name}
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
                  {org.organization_type}
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
                  {org.summary}
                </Card>
              </Grid>
            </Grid>
          </Card>
        )}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          {postForm}
          <Button
            variant="contained"
            color="primary"
            onClick={this.makeActivity}
          >
            New Activity
          </Button>
        </div>
        <h3 style={{ textAlign: 'center' }}>Your Activities</h3>
        {post &&
          post.map((item, index) => (
            <OrganizationProfileItem item={item} key={index} />
          ))}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(OrganizationProfile);
