import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, Button } from '@material-ui/core';
import OrganizationProfileItem from '../OrganizationProfileItem/OrganizationProfileItem';

class OrganizationProfile extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_ORG_PROFILE' });
  }

  render() {
    console.log(this.props.store.orgProfileReducer);
    return (
      <div>
        {this.props.store.orgProfileReducer.map((item, index) => (
          <OrganizationProfileItem item={item} key={index} />
        ))}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(OrganizationProfile);
