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

class RegisterFormVolunteer extends Component {
  state = {
    username: '',
    password: '',
    name_of_organization: '',
    contact_first_name: '',
    contact_last_name: '',
    phone_number: '',
    email: '',
    contact_title: '',
    website: '',
    organization_type: '',
    mission_statement: '',
    organization_summary: '',
    type_of_cause: '',
    url: '',
    causes: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_CAUSES',
    });
    console.log('!!!!!STORE DATA!!!!!', this.props.store.causes);
  }

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        name_of_organization: this.state.name_of_organization,
        contact_first_name: this.state.contact_first_name,
        contact_last_name: this.state.contact_last_name,
        phone_number: this.state.phone_number,
        email: this.state.email,
        contact_title: this.state.contact_title,
        website: this.state.website,
        organization_type: this.state.organization_type,
        mission_statement: this.state.mission_statement,
        organization_summary: this.state.organization_summary,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
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
              type="name_of_organization"
              name="name_of_organization"
              value={this.state.name_of_organization}
              required
              onChange={this.handleInputChangeFor('name_of_organization')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact First Name:"
              type="contact_first_name"
              name="contact_first_name"
              value={this.state.contact_first_name}
              required
              onChange={this.handleInputChangeFor('contact_first_name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Last Name:"
              type="contact_last_name"
              name="contact_last_name"
              value={this.state.contact_last_name}
              required
              onChange={this.handleInputChangeFor('contact_last_name')}
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
              label="Email:"
              type="email"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
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
                <MenuItem value="Non-Profit">Non-Profit</MenuItem>
                <MenuItem value="School">TweSchoolnty</MenuItem>
                <MenuItem value="Community Group">Community Group</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
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
              type="mission_statement"
              name="mission_statement"
              value={this.state.mission_statement}
              required
              onChange={this.handleInputChangeFor('mission_statement')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              label="Organization Summary:"
              type="organization_summary"
              name="organization_summary"
              value={this.state.organization_summary}
              required
              onChange={this.handleInputChangeFor('organization_summary')}
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
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          key={index.toString()}
                          value={item.id}
                          onChange={this.handleCheckbox}
                          name="checked"
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

export default connect(mapStoreToProps)(RegisterFormVolunteer);
