// imports for React and connect are different for this functional component!
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI imports
import { Tabs, Tab, Container, Grid } from '@material-ui/core';
import ImageUploader from '../ImageUploader/ImageUploader';
import RequestedTable from '../RequestedTable/RequestedTable';
import ApprovedTable from '../ApprovedTable/ApprovedTable';

function AdminPanel(props) {
  // BELOW IS HOW TO USE DISPATCH!!

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch to get all tips to render on page load
  //   dispatch({
  //     type: 'GET_REQUESTED_ADMIN',
  //   });
  // });

  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <h2 style={{ marginLeft: '32px', fontSize: '2.2em' }}>Admin Panel</h2>
      <Grid container>
        <Grid item>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {/* Each of the tabs below should get a component - one that displays
            requested orgs and one that displays approved orgs */}
            <Tab label="Requested" />
            <Tab label="Approved" />
          </Tabs>
        </Grid>
      </Grid>
      {selectedTab === 0 && <RequestedTable />}
      {selectedTab === 1 && <ApprovedTable />}
    </Container>
  );
}

export default connect(mapStoreToProps)(AdminPanel);
