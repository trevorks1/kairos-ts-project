import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CheckIcon from '@material-ui/icons/Check';

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
        <TableCell style={{ width: '100px' }}>
          <DeleteForeverOutlinedIcon
            color="primary"
            style={{ float: 'right', marginLeft: '15px', marginRight: '20px' }}
            onClick={this.handleDelete}
          />
          <CheckIcon style={{ float: 'right' }} onClick={this.handleApprove} />
        </TableCell>
      </TableRow>
    );
  }
}

export default connect()(RequestedTableData);
