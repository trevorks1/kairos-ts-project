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
      <div>
        <Container>
          <TableContainer className="formPanel">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong>Organization Name</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Phone Number</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Address</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email Address</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.store.adminApprovedReducer.map((item, index) => (
                  <ApprovedTableData item={item} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RequestedTable);
