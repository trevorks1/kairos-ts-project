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
              <TableCell>Organization Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Approve/Deny</TableCell>
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
