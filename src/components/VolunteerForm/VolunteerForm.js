import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link, withRouter } from 'react-router-dom';
import {
  TextField,
  Box,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    phone_number: '',
    email_address: '',
    company: 'false',
    ages_id: [],
    company_name: '',
    activity_type_id: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_AGES',
    });
    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });
  }

  registerUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'REGISTER_VOLUNTEER',
      payload: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        password: this.state.password,
        phone_number: this.state.phone_number,
        email_address: this.state.email_address,
        company: this.state.company,
        ages_id: this.state.ages_id,
        company_name: this.state.company_name,
        activity_type_id: this.state.activity_type_id,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleAgeCheckbox = (event) => {
    let newAgeRange = parseInt(event.target.value);
    const isSelected = event.target.checked;
    if (isSelected === true) {
      this.setState({
        ...this.state,
        ages_id: [...this.state.ages_id, newAgeRange],
      });
    } else if (isSelected === false) {
      const ageArray = this.state.ages_id;
      const updatedAgeRange = ageArray.filter((item) => {
        return item !== newAgeRange;
      });
      this.setState({
        ...this.state,
        ages_id: updatedAgeRange,
      });
    }
  };

  handleActivitiesCheckbox = (event) => {
    let newActivity = parseInt(event.target.value);
    const isSelected = event.target.checked;
    if (isSelected === true) {
      this.setState(
        {
          ...this.state,
          activity_type_id: [...this.state.activity_type_id, newActivity],
        },
        () => {
          console.log(this.state.activity_type_id);
        }
      );
    } else if (isSelected === false) {
      const actArray = this.state.activity_type_id;
      const updatedActivities = actArray.filter((item) => {
        return item !== newActivity;
      });
      this.setState({
        ...this.state,
        activity_type_id: updatedActivities,
      });
    }
  };

  render() {
    return (
      <form className="formPanel formPanel_wide" onSubmit={this.registerUser}>
        <h2>Volunteer Registration</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name:"
              type="text"
              name="first_name"
              value={this.state.first_name}
              required
              onChange={this.handleInputChangeFor('first_name')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name:"
              type="text"
              name="last_name"
              value={this.state.last_name}
              required
              onChange={this.handleInputChangeFor('last_name')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username:"
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password:"
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number:"
              type="phone_number"
              name="phone_number"
              value={this.state.phone_number}
              required
              onChange={this.handleInputChangeFor('phone_number')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address:"
              type="email"
              name="email"
              value={this.state.email_address}
              required
              onChange={this.handleInputChangeFor('email_address')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Is this for a company?</FormLabel>
              <RadioGroup
                row
                aria-label="company"
                name="company"
                value={this.state.company}
                onChange={this.handleInputChangeFor('company')}
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
            {this.state.company == 'true' && (
              <TextField
                fullWidth
                variant="outlined"
                label="Company Name"
                type="company_name"
                name="company_name"
                value={this.state.company_name}
                required
                onChange={this.handleInputChangeFor('company_name')}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Age Groups</InputLabel>
            <Grid container spacing={1}>
              {this.props.store.ages.map((item, index) => {
                return (
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.ages_id.indexOf(item.id) !== -1}
                          value={item.id}
                          color="primary"
                          onChange={this.handleAgeCheckbox}
                        />
                      }
                      label={item.range}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Activities interested in:</InputLabel>
            <Grid container spacing={1}>
              {this.props.store.activities.activityList.map((item, index) => {
                return (
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            this.state.activity_type_id.indexOf(item.id) !== -1
                          }
                          value={item.id}
                          color="primary"
                          onChange={this.handleActivitiesCheckbox}
                        />
                      }
                      label={item.activity_name}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <Button variant="contained">Cancel</Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RegisterForm));
