import React, { Component } from 'react';

class AdminPanel extends Component {
  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome to the Admin Panel, {this.props.store.user.username}!
        </h1>
        <p>Your ID is: {this.props.store.user.id}</p>
      </div>
    );
  }
}

export default AdminPanel;
