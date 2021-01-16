import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

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

// /register/org

class RegisterFormVolunteer extends Component {
  state = {
    username: '',
    password: '',
    organization_name: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    email_address: '',
    contact_title: '',
    website: '',
    organization_type: '',
    mission: '',
    summary: '',
    type_of_cause: '',
    url: '',
    causes: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });
    this.props.dispatch({
      type: 'GET_ORG_PROFILE',
    });
  }

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'ORG_REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        organization_name: this.state.organization_name,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number: this.state.phone_number,
        address: this.state.address,
        email_address: this.state.email_address,
        contact_title: this.state.contact_title,
        website: this.state.website,
        organization_type: this.state.organization_type,
        mission: this.state.mission,
        summary: this.state.summary,
        causes: this.state.causes,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // const updateUsesTools = (item) => {
  //   if (usesTools.includes(item)) {
  //     setUsesTools(usesTools.filter(tool => tool.value != item));
  //   } else {
  //     setUsesTools([...usesTools, item]);// or push
  //   }
  // };

  handleCheckbox = (event) => {
    let newCauses = parseInt(event.target.value);
    const isSelected = event.target.checked;
    if (isSelected === true) {
      this.setState({
        ...this.state,
        causes: [...this.state.causes, newCauses],
      });
    } else if (isSelected === false) {
      const causesArray = this.state.causes;
      const updatedCauses = causesArray.filter((item) => {
        return item !== newCauses;
      });
      this.setState({
        ...this.state,
        causes: updatedCauses,
      });
    }
  };

  render() {
    let message;
    if (this.props.store.orgSuccess == 1) {
      message = (
        <h3 className="alert" role="alert">
          You've successfully registered. Check your email for approval.
        </h3>
      );
    }
    return (
      <form className="formPanel formPanel_wide" onSubmit={this.registerUser}>
        <h2>Organization Registration</h2>
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
              label="Name of Organization:"
              type="organization_name"
              name="organization_name"
              value={this.state.organization_name}
              required
              onChange={this.handleInputChangeFor('organization_name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Title:"
              type="contact_title"
              name="contact_title"
              value={this.state.contact_title}
              required
              onChange={this.handleInputChangeFor('contact_title')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact First Name:"
              type="first_name"
              name="first_name"
              value={this.state.first_name}
              required
              onChange={this.handleInputChangeFor('first_name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Last Name:"
              type="last_name"
              name="last_name"
              value={this.state.last_name}
              required
              onChange={this.handleInputChangeFor('last_name')}
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
              label="Address:"
              type="address"
              name="address"
              value={this.state.address}
              required
              onChange={this.handleInputChangeFor('address')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email:"
              type="email_address"
              name="email_address"
              value={this.state.email_address}
              required
              onChange={this.handleInputChangeFor('email_address')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Website:"
              type="website"
              name="website"
              value={this.state.website}
              required
              onChange={this.handleInputChangeFor('website')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="organization_type">
                Select Organization Type
              </InputLabel>
              <Select
                labelId="organization_type"
                value={this.state.organization_type}
                onChange={this.handleInputChangeFor('organization_type')}
                label="Select Organization Type"
              >
                <MenuItem value="">
                  <em>None</em>
                  {/* TODO - need to get types from server */}
                </MenuItem>
                <MenuItem key="1" value="Non-Profit">
                  Non-Profit
                </MenuItem>
                <MenuItem key="2" value="School">
                  School
                </MenuItem>
                <MenuItem key="3" value="Community Group">
                  Community Group
                </MenuItem>
                <MenuItem key="4" value="Other">
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              label="Mission Statement:"
              type="mission"
              name="mission"
              value={this.state.mission}
              required
              onChange={this.handleInputChangeFor('mission')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              label="Organization Summary:"
              type="summary"
              name="summary"
              value={this.state.summary}
              required
              onChange={this.handleInputChangeFor('summary')}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>
              Type of causes your organization is involved in:
            </InputLabel>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {this.props.store.causes.map((item, index) => {
                return (
                  <Grid key={index.toString()} item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.causes.indexOf(item.id) !== -1}
                          value={item.id}
                          onChange={this.handleCheckbox}
                          color="primary"
                        />
                      }
                      label={item.cause}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            Upload Logo
            {/* TODO - AWS S3 needs to go here! */}
          </Grid>
          <Grid item xs={12}>
            {message}
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

export default connect(mapStoreToProps)(RegisterFormVolunteer);
