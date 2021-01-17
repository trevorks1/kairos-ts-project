import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RequestedTableData from '../RequestedTableData/RequestedTableData';
import './RequestedTable.css';
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from '@material-ui/core';

class RequestedTable extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_REQUESTED_ADMIN' });
  }

  render() {
    return (
      <TableContainer className="formPanel">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Organization Name</h4>
              </TableCell>
              <TableCell>
                <h4>Phone Number</h4>
              </TableCell>
              <TableCell>
                <h4>Address</h4>
              </TableCell>
              <TableCell>
                <h4>Email</h4>
              </TableCell>
              <TableCell>
                <h4>Approve/Deny</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.store.adminReducer.map((item, index) => (
              <RequestedTableData item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStoreToProps)(RequestedTable);
