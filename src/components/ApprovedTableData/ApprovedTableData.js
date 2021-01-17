import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';

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
      <TableRow>
        <TableCell>{this.props.item.organization_name}</TableCell>
        <TableCell>{this.props.item.phone_number}</TableCell>
        <TableCell>{this.props.item.address}</TableCell>
        <TableCell>{this.props.item.email_address}</TableCell>
      </TableRow>
    );
  }
}

export default connect()(ApprovedTableData);
