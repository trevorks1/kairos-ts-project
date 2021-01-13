import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
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
} from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phone_number: '',
    email: '',
    age_groups: [{}, {}, {}, {}],
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER_VOLUNTEER',
      payload: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password,
        phone_number: this.state.phone_number,
        email: this.state.email,
        ape_groups: this.state.age_groups,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [propertyName]: event.target.value,
      },
    });
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
              name="firstname"
              value={this.state.firstname}
              required
              onChange={this.handleInputChangeFor('firstname')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name:"
              type="text"
              name="lastname"
              value={this.state.lastname}
              required
              onChange={this.handleInputChangeFor('lastname')}
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
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Age Groups</InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              {this.state.age_groups.map((item, index) => {
                return (
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.age_groups}
                          onChange={this.handleInputChangeFor('age_groups')}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Primary"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained">Cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
