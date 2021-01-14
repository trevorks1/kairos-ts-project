import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RequestedTableData from '../RequestedTableData/RequestedTableData';
import './RequestedTable.css';

class RequestedTable extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_REQUESTED_ADMIN' });
  }

  render() {
    return (
      <div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Org. Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Email Address</th>
              <th>Approve/Deny</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.adminReducer.map((item, index) => (
              <RequestedTableData item={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RequestedTable);
