import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ApprovedTableData from '../ApprovedTableData/ApprovedTableData';
import './ApprovedTable.css';
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
    this.props.dispatch({ type: 'GET_APPROVED_ADMIN' });
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
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.store.adminApprovedReducer.map((item, index) => (
              <ApprovedTableData item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStoreToProps)(RequestedTable);
