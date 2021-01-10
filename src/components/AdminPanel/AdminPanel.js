// imports for React and connect are different for this functional component!
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI imports
import { Tabs, Tab } from '@material-ui/core';

function AdminPanel(props) {
  // BELOW IS HOW TO USE DISPATCH!!

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch to get all tips to render on page load
  //   dispatch({
  //     type: 'GET_TIPS',
  //   });
  // }, [dispatch]);

  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <h1 id="welcome">
        Welcome to the Admin Panel, {props.store.user.username}!
      </h1>
      <p>Your ID is: {props.store.user.id}</p>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Requested" />
        <Tab label="Approved" />
      </Tabs>
      {selectedTab === 0 && <h3>REQUESTED</h3>}
      {selectedTab === 1 && <h3>APPROVED</h3>}
    </div>
  );
}

export default connect(mapStoreToProps)(AdminPanel);
