import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ApprovedTableData from '../ApprovedTableData/ApprovedTableData';
import './ApprovedTable.css';

class RequestedTable extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_APPROVED_ADMIN' });
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
            </tr>
          </thead>
          <tbody>
            {this.props.store.adminApprovedReducer.map((item, index) => (
              <ApprovedTableData item={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RequestedTable);
