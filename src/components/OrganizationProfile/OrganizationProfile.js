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
  InputLabel,
} from '@material-ui/core';
import OrganizationProfileItem from '../OrganizationProfileItem/OrganizationProfileItem';

class OrganizationProfile extends Component {
  state = {
    newPost: false,
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
      ages_id: [1, 2],
      activity_type_id: [1, 2],
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

  handleSubmit = (event) => {
    console.log('New Activity: ', this.state.postData);
    this.props.dispatch({
      type: 'POST_ACTIVITY',
      payload: this.state.postData,
    });
    this.setState({
      newPost: false,
    });
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
                    width: '400px',
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
                    id="standard-textarea"
                    variant="outlined"
                    label="People Needed"
                    placeholder="People Needed"
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

                {/* <Grid item xs={6}>
                  <FormControl className="size" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Age Range
                    </InputLabel>
                    <Select
                      required
                      onChange={this.handleChangeFor('age_id')}
                      native
                      label="Repeating"
                      value={this.state.age_id}
                      inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                      }}
                      style={{ width: '410px' }}
                    >
                      <option value=""></option>
                      <option value="1">0-4</option>
                      <option value="2">5-12</option>
                      <option value="3">13-17</option>
                      <option value="4">Adult</option>
                      <option value="5">Adult 55+</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className="size" variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Activity Type
                    </InputLabel>
                    <Select
                      required
                      onChange={this.handleChangeFor('activity_type_id')}
                      native
                      label="Activity Types"
                      value={this.state.activity_type_id}
                      inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                      }}
                      style={{ width: '410px' }}
                    >
                      <option value=""></option>
                      <option value="1">Arts & Crafts</option>
                      <option value="2">Canvassing</option>
                      <option value="3">Cleaning</option>
                      <option value="4">Dog Walking</option>
                      <option value="5">Event Help</option>
                      <option value="6">Gardening</option>
                      <option value="7">Landscaping</option>
                      <option value="8">Litter Pickup</option>
                      <option value="9">Moving</option>
                      <option value="10">Other</option>
                      <option value="11">Packing</option>
                      <option value="12">Painting</option>
                      <option value="13">Reading</option>
                      <option value="14">Sorting</option>
                    </Select>
                  </FormControl>
                </Grid> */}
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
