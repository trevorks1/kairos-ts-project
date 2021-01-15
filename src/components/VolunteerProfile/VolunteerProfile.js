import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

class VolunteerProfile extends Component {
  state = {
    editActivitiesBtnSelected: false,
    editActivitiesSelected: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PREF_ACTIVITIES',
    });

    // gets all activities to map through and display as checkboxes for edit
    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });
  }

  handleEditActivities = () => {
    this.setState({
      editActivitiesBtnSelected: true,
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
  render() {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Paper elevation={2}>
              <Typography variant="h2" component="h2" align="center">
                Thank you for being a volunteer
              </Typography>
              <Typography variant="h2" component="h2" align="center">
                We appreciate you!
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={12}>
            <Grid container>
              <Grid item>
                <Typography variant="h3" component="h3">
                  Hello {this.props.store.user.first_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={5}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography variant="h5" component="h5">
                      EMAIL
                    </Typography>
                    <Typography variant="body1" component="p">
                      {this.props.store.user.email_address}
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Typography variant="h5" component="h5">
                      PHONE
                    </Typography>
                    <Typography variant="body1" component="p">
                      {this.props.store.user.phone_number}
                    </Typography>
                  </Grid>
                </Grid>
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

                    <Button
                      variant="contained"
                      onClick={this.handleEditActivities}
                    >
                      EDIT
                    </Button>
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
                                      ) !== -1
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
                    <Button
                      variant="contained"
                      onClick={this.handleSubmitActivities}
                    >
                      SUBMIT
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(VolunteerProfile);
