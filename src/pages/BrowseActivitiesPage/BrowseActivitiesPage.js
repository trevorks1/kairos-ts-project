import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import { Container } from '@material-ui/core';

class BrowseActivitiesPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);

    this.props.dispatch({
      type: 'GET_POSTINGS_FOR_SELECTED_CAUSE',
      payload: this.props.match.params.id,
    });
  }
  render() {
    return (
      <Container>
        <h1>Browse these activities!</h1>
        {JSON.stringify(this.props.store.postings.postingsForSelectedCause)}
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(BrowseActivitiesPage);
