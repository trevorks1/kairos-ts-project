import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

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
      <tr>
        <td>{this.props.item.organization_name}</td>
        <td>{this.props.item.phone_number}</td>
        <td>{this.props.item.address}</td>
        <td>{this.props.item.email_address}</td>
        <td>
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
        </td>
      </tr>
    );
  }
}

export default connect()(RequestedTableData);
