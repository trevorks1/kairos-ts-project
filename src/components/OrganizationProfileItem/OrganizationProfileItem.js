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
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

const muiStyles = (theme) =>
  createStyles({
    icons: {
      backgroundColor: theme.palette.primary.main,
    },
  });

class OrganizationProfileItem extends Component {
  state = {
    editPost: false,
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
    id: '',
  };

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      id: this.props.item.id,
      [propertyName]: event.target.value,
    });
  };

  makeActivity = (event) => {
    if (this.state.editPost === false) {
      this.setState({
        editPost: true,
      });
    } else if (this.state.editPost === true) {
      this.setState({
        editPost: false,
      });
    }
  };

  handleSubmit = (event) => {
    console.log('Edit Activity: ', this.state);
    this.props.dispatch({
      type: 'UPDATE_ACTIVITY',
      payload: this.state,
    });
    this.setState({
      editPost: false,
    });
  };

  markComplete = (event) => {
    this.props.dispatch({
      type: 'PUT_ACTIVITY_COMPLETE',
      payload: this.props.item.id,
    });
  };

  render() {
    const datePosted = DateTime.fromISO(this.props.item.date_to_attend);
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
              marginRight: '100px',
              marginLeft: '100px',
            }}
          >
            <CardActionArea onClick={this.handlePostingClick}>
              <CardHeader
                avatar={
                  <Avatar className={this.props.classes.icons}>
                    <FavoriteBorder></FavoriteBorder>
                  </Avatar>
                } // adding 1 to postingId because array index starts at 0!
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
                  Attend Date: {humanReadablePostedDate}
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
                <Button style={{ float: 'right' }} onClick={this.makeActivity}>
                  Edit
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <Dialog
            onClose={this.makeActivity}
            open={this.state.editPost}
            fullWidth="true"
            maxWidth="md"
          >
            <DialogTitle>Edit Activity</DialogTitle>
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
        </div>
      </div>
    );
  }
}

export default connect()(withStyles(muiStyles)(OrganizationProfileItem));
