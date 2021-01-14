import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

class ApprovedTableData extends Component {
  handleDelete = (event) => {
    console.log(this.props.item.user_id);
    this.props.dispatch({
      type: 'DELETE_ORG',
      payload: this.props.item.user_id,
    });
  };

  render() {
    return (
      <tr>
        <td>{this.props.item.organization_name}</td>
        <td>{this.props.item.phone_number}</td>
        <td>{this.props.item.address}</td>
        <td>{this.props.item.email_address}</td>
      </tr>
    );
  }
}

export default connect()(ApprovedTableData);
