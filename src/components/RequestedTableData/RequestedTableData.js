import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';

class RequestedTableData extends Component {
  handleApprove = (event) => {
    console.log(this.props.item.user_id);
    this.props.dispatch({
      type: 'APPROVE_ORG',
      payload: this.props.item.user_id,
    });
  };

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
        <TableCell>
          <Button
            variant="contained"
            style={{
              height: '20px',
              width: '40px',
              fontSize: '.8em',
              marginRight: '20px',
            }}
            onClick={this.handleApprove}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              height: '20px',
              width: '40px',
              fontSize: '.8em',
            }}
            onClick={this.handleDelete}
          >
            Deny
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default connect()(RequestedTableData);
