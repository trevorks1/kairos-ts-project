import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// CUSTOM COMPONENTS
import PostingCard from '../../components/PostingCard/PostingCard';

// MATERIAL-UI
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';

class VolunteerProfile extends Component {
  state = {
    editActivitiesBtnSelected: false,
    editContactBtnSelected: false,
    editActivitiesSelected: [],
    user_email: '',
    user_phone: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PREF_ACTIVITIES',
    });

    // gets all activities to map through and display as checkboxes for edit
    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });

    // gets all postings user has signed up for
    this.props.dispatch({
      type: 'GET_POSTINGS_FOR_VOLUNTEER',
    });
  }
  handleEditActivities = () => {
    const selected = [];
    for (
      let i = 0;
      i < this.props.store.activities.prefActivityList.length;
      i++
    ) {
      selected.push(
        this.props.store.activities.prefActivityList[i].activity_type_id
      );
    }
    this.setState({
      editActivitiesSelected: selected,
    });

    this.setState({
      editActivitiesBtnSelected: true,
    });
  };

  handleEditContact = () => {
    this.setState({
      editContactBtnSelected: true,
    });
  };

  handleSubmitContact = () => {
    this.setState({
      editContactBtnSelected: false,
    });
    const dataToSend = {
      email_address: this.state.user_email,
      phone_number: this.state.user_phone,
    };
    this.props.dispatch({
      type: 'UPDATE_CONTACT_INFO',
      payload: dataToSend,
    });
  };

  handleSubmitActivities = () => {
    this.setState({
      editActivitiesBtnSelected: false,
    });
    // data to be posted - this.state.editActivitiesSelected
    // data to be deleted - actDeleteArray
    const actDeleteArray = [];
    for (
      let i = 0;
      i < this.props.store.activities.prefActivityList.length;
      i++
    ) {
      actDeleteArray.push(
        this.props.store.activities.prefActivityList[i].activity_type_id
      );
    }

    this.props.dispatch({
      type: 'UPDATE_PREF_ACTIVITIES',
      payload: {
        deleteArray: actDeleteArray,
        postArray: this.state.editActivitiesSelected,
      },
    });
  };

  eventsForMeClick = () => {
    // default id is 0 incase user has no saved preferred activities
    let idToSend = 0;
    if (this.props.store.activities.prefActivityList.length > 0) {
      idToSend = this.props.store.activities.prefActivityList[0]
        .activity_type_id;
    }
    this.props.dispatch({
      type: 'GET_USER_POSTINGS',
      payload: idToSend,
    });
    this.props.history.push('/browse/8080');
  };

  handleCancelClickActivity = () => {
    this.setState({
      editActivitiesBtnSelected: false,
    });
  };

  handleCancelClickContact = () => {
    this.setState({
      editContactBtnSelected: false,
    });
  };

  handleCheckBoxes = (event) => {
    let newActivity = parseInt(event.target.value);
    const isSelected = event.target.checked;

    if (isSelected === true) {
      this.setState({
        ...this.state,
        editActivitiesSelected: [
          ...this.state.editActivitiesSelected,
          newActivity,
        ],
      });
    } else if (isSelected === false) {
      const actArray = this.state.editActivitiesSelected;
      const updatedActivities = actArray.filter((item) => {
        return item !== newActivity;
      });
      this.setState({
        ...this.state,
        editActivitiesSelected: updatedActivities,
      });
    }
  };

  handleTextFieldChange = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };
  render() {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt={6}>
              <Paper
                elevation={2}
                style={{
                  backgroundColor: '#FF4D53',
                  color: 'white',
                  padding: '10px',
                  textShadow: '1px 1px 1px black',
                }}
              >
                <Typography variant="h2" component="h2" align="center">
                  Thank you for being a volunteer
                </Typography>
                <Typography variant="h2" component="h2" align="center">
                  We appreciate you!
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Box mb={1}>
                  <Typography variant="h4" component="h4">
                    Hello {this.props.store.user.first_name}!
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5}>
                {this.state.editContactBtnSelected === false ? (
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h5" component="h5">
                        EMAIL
                      </Typography>
                      <Typography variant="body1" component="p">
                        {this.props.store.user.email_address}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5" component="h5">
                        PHONE
                      </Typography>
                      <Typography variant="body1" component="p">
                        {this.props.store.user.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          onClick={this.handleEditContact}
                        >
                          EDIT
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item xs={6}>
                      <TextField
                        label={this.props.store.user.email_address}
                        value={this.state.user_email}
                        onChange={this.handleTextFieldChange('user_email')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={this.props.store.user.phone_number}
                        value={this.state.user_phone}
                        onChange={this.handleTextFieldChange('user_phone')}
                      />
                    </Grid>
                    <Box mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleCancelClickContact}
                          >
                            CANCEL
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleSubmitContact}
                            color="primary"
                          >
                            SUBMIT
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Grid item lg={7}>
                <Typography variant="h5" component="h5">
                  MY PREFERRED ACTIVITY TYPES
                </Typography>
                {this.state.editActivitiesBtnSelected === false ? (
                  // map through preferred activities
                  <div>
                    {this.props.store.activities.prefActivityList.map(
                      (item, index) => {
                        return (
                          <Typography variant="body1" component="p" key={index}>
                            {item.activity_name}
                          </Typography>
                        );
                      }
                    )}
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        onClick={this.handleEditActivities}
                      >
                        EDIT
                      </Button>
                    </Box>
                  </div>
                ) : (
                  <div>
                    {/* below is code for the edit activity pref. checkboxes */}
                    <Grid container spacing={2} item xs={12}>
                      {this.props.store.activities.activityList.map(
                        (item, index) => {
                          return (
                            <Grid item xs={3} key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      this.state.editActivitiesSelected.indexOf(
                                        item.id
                                      ) > -1
                                    }
                                    value={item.id}
                                    onChange={this.handleCheckBoxes}
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
                    <Box mt={2}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleCancelClickActivity}
                          >
                            CANCEL
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleSubmitActivities}
                            color="primary"
                          >
                            SUBMIT
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Box mt={10}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h3" component="h3">
                  My Upcoming Events
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  onClick={this.eventsForMeClick}
                  color="primary"
                >
                  EVENTS FOR ME
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box mt={3}>
                  {this.props.store.postings.postingsForVolunteerUser.map(
                    (item, index) => {
                      return <PostingCard posting={item} postingId={index} />;
                    }
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(VolunteerProfile));
