import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link, withRouter } from 'react-router-dom';

// MATERIAL-UI
import {
  Container,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
} from '@material-ui/core';

import { withStyles, createStyles } from '@material-ui/core/styles';

// CUSTOM COMPONENTS
import ActivityDetailsCard from '../../components/ActivityDetailsCard/ActivityDetailsCard';

const muiStyle = (theme) =>
  createStyles({
    media: {
      height: '500px',
    },
  });

class ActivityDetailsPage extends Component {
  state = {
    wantToHelp: false,
    email: '',
    member_name: '',
    age_id: 0,
    agree: false,
    isGroup: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_POSTING',
      payload: this.props.match.params.id,
    });
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleAgeCheckbox = (event) => {
    this.setState({
      ages_id: event.target.value,
    });
  };

  handleBackBtnClick = () => {
    // pushes user back to previous page - list of postings
    // OR pushes volunteer back to their profile page if they are viewing an 'upcoming posting' they have signed up for
    this.props.history.goBack();
  };

  handleSave = () => {
    this.setState({
      wantToHelp: false,
    });
  };

  wantToHelp = () => {
    if (this.state.wantToHelp === false) {
      this.setState({
        wantToHelp: true,
      });
    } else {
      this.setState({
        wantToHelp: false,
      });
    }
  };
  render() {
    let posting;
    if (this.props.store.postings.postingDetails[0] != undefined) {
      posting = this.props.store.postings.postingDetails[0];
    }
    return (
      <Container>
        <Paper>
          <Grid container alignItems="center">
            <Grid item lg={6}>
              <Box ml={3}>
                <Grid item>
                  <h1>{posting && posting.title}</h1>
                </Grid>
              </Box>
              <Box ml={3}>
                <Grid item>
                  <h3>{posting && posting.organization_name}</h3>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Grid container alignItems="center" justify="space-evenly">
                <Grid item>
                  <Button variant="contained" onClick={this.handleBackBtnClick}>
                    BACK
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.wantToHelp}
                  >
                    I WANT TO HELP
                  </Button>
                  <Dialog
                    onClose={this.wantToHelp}
                    open={this.state.wantToHelp}
                  >
                    <DialogTitle>Volunteer for this activity!</DialogTitle>
                    <DialogContent>
                      {/* modal form goes here */}
                      <Link target={'_blank'} to="/info">
                        Read the Waiver
                      </Link>
                      <FormControlLabel
                        label="I have read the waiver and agree to the waiver."
                        labelPlacement="start"
                        control={<Checkbox color="primary" />}
                      />
                      {/* hide/show if isGroup == true radial */}
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          {'  '}
                          Is this a group of volunteers?
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-label="isGroup"
                          name="isGroup"
                          value={this.state.isGroup}
                          onChange={this.handleInputChangeFor('isGroup')}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio color="primary" />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                      {this.state.isGroup == 'true' && (
                        <Grid container spacing={2}>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={9}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Full Name:"
                              type="member_name"
                              name="member_name"
                              value={this.state.member_name}
                              required
                              onChange={this.handleInputChangeFor(
                                'member_name'
                              )}
                            />
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={9}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Email Address:"
                              type="email"
                              name="email"
                              value={this.state.email}
                              required
                              onChange={this.handleInputChangeFor('email')}
                            />
                          </Grid>
                          <br />
                          <br />
                          <div style={{ textAlign: 'center' }}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                {'  '}
                                Age range of volunteer
                              </FormLabel>
                              <RadioGroup
                                row
                                aria-label="age_id"
                                name="age_id"
                                value={this.state.age_id}
                                onChange={this.handleInputChangeFor('age_id')}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio color="primary" />}
                                  label="0 to 4"
                                />
                                <FormControlLabel
                                  value="2"
                                  control={<Radio color="primary" />}
                                  label="5 to 12"
                                />
                                <FormControlLabel
                                  value="3"
                                  control={<Radio color="primary" />}
                                  label="13 to 17"
                                />
                                <FormControlLabel
                                  value="4"
                                  control={<Radio color="primary" />}
                                  label="18 to 54"
                                />
                                <FormControlLabel
                                  value="5"
                                  control={<Radio color="primary" />}
                                  label="55+"
                                />
                              </RadioGroup>
                              <Button
                                style={{ textAlign: 'center' }}
                                variant="contained"
                                color="primary"
                              >
                                Add Another Person
                              </Button>
                            </FormControl>
                          </div>
                        </Grid>
                      )}
                      <br /> <br />
                      <div style={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSave}
                        >
                          I'll see you there! {'(SAVE)'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>
        <Box mt={6}>
          {posting !== undefined && (
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Card>
                  {posting !== undefined ? (
                    <CardContent>
                      <img src={posting.logo} alt="org logo"></img>
                    </CardContent>
                  ) : (
                    <CardContent>
                      <img
                        src={process.env.PUBLIC_URL + '/org-placeholder.png'}
                        alt="org logo"
                      ></img>
                    </CardContent>
                  )}
                  <CardContent>
                    <Typography variant="h4" component="h4">
                      Description:
                    </Typography>
                    <Typography variant="body1" component="p">
                      {posting && posting.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={6}>
                {posting && <ActivityDetailsCard posting={posting} />}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    );
  }
}

export default withStyles(muiStyle)(
  withRouter(connect(mapStoreToProps)(ActivityDetailsPage))
);
