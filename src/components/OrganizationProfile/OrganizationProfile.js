import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
} from '@material-ui/core';
import OrganizationProfileItem from '../OrganizationProfileItem/OrganizationProfileItem';

class OrganizationProfile extends Component {
  state = {
    newPost: false,
    editActivitiesSelected: [],
    editAgesSelected: [],
    postData: {
      title: '',
      date_to_attend: '',
      start_time: '',
      end_time: '',
      location: '',
      description: '',
      repeating: '',
      frequency: '',
      people_needed: '',
      org_id: '',
      ages_id: [],
      activity_type_id: [],
    },
  };

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      postData: {
        ...this.state.postData,
        org_id: this.props.store.orgProfileReducer.org.id,
        [propertyName]: event.target.value,
      },
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

  handleCheckBoxesAge = (event) => {
    let newAge = parseInt(event.target.value);
    const isSelected = event.target.checked;

    if (isSelected === true) {
      this.setState({
        ...this.state,
        postData: {
          ...this.state.postData,
          ages_id: [...this.state.postData.ages_id, newAge],
        },
      });
    } else if (isSelected === false) {
      const actArray = this.state.postData.ages_id;
      const updatedAges = actArray.filter((item) => {
        return item !== newAge;
      });
      this.setState({
        ...this.state,
        postData: {
          ...this.state.postData,
          ages_id: updatedAges,
        },
      });
    }
  };

  handleCheckBoxesAct = (event) => {
    let newActivity = parseInt(event.target.value);
    const isSelected = event.target.checked;

    if (isSelected === true) {
      this.setState({
        ...this.state,
        postData: {
          ...this.state.postData,
          activity_type_id: [
            ...this.state.postData.activity_type_id,
            newActivity,
          ],
        },
      });
    } else if (isSelected === false) {
      const actArray = this.state.postData.activity_type_id;
      const updatedActivities = actArray.filter((item) => {
        return item !== newActivity;
      });
      this.setState({
        ...this.state,
        postData: {
          ...this.state.postData,
          activity_type_id: updatedActivities,
        },
      });
    }
  };

  handleSubmit = (event) => {
    console.log('New Activity: ', this.state.postData);
    this.props.dispatch({
      type: 'POST_ACTIVITY',
      payload: this.state.postData,
    });
    this.props.dispatch({ type: 'GET_ORG_PROFILE' });
    this.setState({
      newPost: false,
      postData: {
        ...this.state.postData,
        ages_id: [],
        activity_type_id: [],
      },
    });
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_ORG_PROFILE' });
    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });
    this.props.dispatch({
      type: 'GET_AGES',
    });
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

    return (
      <div>
        {org && (
          <div
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
                    width: '400px',
                    marginLeft: '50px',
                    marginTop: '25px',
                  }}
                >
                  <CardHeader />
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
                  <CardHeader subheader="Mission Statement" />
                  {org.mission}
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
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <Dialog
            onClose={this.makeActivity}
            open={this.state.newPost}
            fullWidth="true"
            maxWidth="md"
          >
            <DialogTitle>New Activity</DialogTitle>
            <DialogContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="text"
                    onChange={this.handleChangeFor('title')}
                    id="standard-textarea"
                    variant="outlined"
                    label="Title"
                    placeholder="Title"
                    multiline
                    style={{
                      width: '90%',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <TextField
                      required
                      type="text"
                      onChange={this.handleChangeFor('date_to_attend')}
                      id="standard-textarea"
                      variant="outlined"
                      label="Date to Attend"
                      placeholder="Date to Attend"
                      multiline
                      style={{
                        width: '90%',
                        marginBottom: '20px',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="text"
                    onChange={this.handleChangeFor('location')}
                    id="standard-textarea"
                    variant="outlined"
                    label="Location"
                    placeholder="Location"
                    multiline
                    style={{
                      width: '90%',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="number"
                    onChange={this.handleChangeFor('people_needed')}
                    id="standard-number"
                    variant="outlined"
                    label="People Needed"
                    placeholder="People Needed"
                    style={{
                      width: '90%',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="text"
                    onChange={this.handleChangeFor('start_time')}
                    id="standard-textarea"
                    variant="outlined"
                    label="Start Time"
                    placeholder="Start Time"
                    multiline
                    style={{
                      width: '90%',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="text"
                    onChange={this.handleChangeFor('end_time')}
                    id="standard-textarea"
                    variant="outlined"
                    label="End Time"
                    placeholder="End Time"
                    multiline
                    style={{
                      width: '90%',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="number"
                    onChange={this.handleChangeFor('frequency')}
                    id="standard-textarea"
                    variant="outlined"
                    label="Frequency"
                    placeholder="Frequency"
                    multiline
                    style={{
                      width: '90%',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl className="size" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Repeating
                    </InputLabel>
                    <Select
                      required
                      onChange={this.handleChangeFor('repeating')}
                      native
                      label="Repeating"
                      value={this.state.repeating}
                      inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                      }}
                      style={{ width: '410px' }}
                    >
                      <option value="false">Is this event repeating?</option>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="number"
                    onChange={this.handleChangeFor('description')}
                    id="standard-textarea"
                    variant="outlined"
                    multiline
                    label="Description"
                    placeholder="Description"
                    multiline
                    style={{
                      width: '96%',
                      marginBottom: '20px',
                      marginTop: '20px',
                    }}
                  />
                </Grid>
                <div>
                  <h4>Select Activity Types: </h4>
                </div>
                <Grid container spacing={2} item xs={12}>
                  {this.props.store.activities.activityList.map(
                    (item, index) => {
                      return (
                        <Grid item xs={3} key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  this.state.postData.activity_type_id.indexOf(
                                    item.id
                                  ) !== -1
                                }
                                value={item.id}
                                onChange={this.handleCheckBoxesAct}
                                color="primary"
                              />
                            }
                            label={item.activity_name}
                          />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
                <div>
                  <h4>Select Age Ranges: </h4>
                </div>
                <Grid container spacing={2} item xs={12}>
                  {this.props.store.ages.map((item, index) => {
                    return (
                      <Grid item xs={3} key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                this.state.postData.ages_id.indexOf(item.id) !==
                                -1
                              }
                              value={item.id}
                              onChange={this.handleCheckBoxesAge}
                              color="primary"
                            />
                          }
                          label={item.range}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

                <Grid item xs={2}>
                  <Button variant="contained" onClick={this.makeActivity}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    style={{ marginBottom: '20px' }}
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Button
            variant="contained"
            color="primary"
            onClick={this.makeActivity}
          >
            New Activity
          </Button>
        </div>
        <h2 style={{ textAlign: 'center', fontSize: '2em' }}>
          Your Activities
        </h2>
        <Container>
          {post &&
            post.map((item, index) => (
              <OrganizationProfileItem item={item} key={index} />
            ))}
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(OrganizationProfile);
