import React, { Component } from 'react';

class BrowseActivitiesPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }
  render() {
    return <h1>Browse these activities!</h1>;
  }
}

export default BrowseActivitiesPage;
