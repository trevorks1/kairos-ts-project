import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Profile';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Kairos</h2>
      </Link>
      <div className="nav-right">
        {/* the About link for organization seems pointless because with 
        auth redirect they end up getting directed to /user 
        we might have address this*/}
        {props.store.user.access_level_id === 2 && (
          <Link className="nav-link" to="/home">
            About
          </Link>
        )}
        {props.store.user.id == null && (
          <Link className="nav-link">Browse</Link>
        )}
        {props.store.user.access_level_id === 3 && (
          <Link className="nav-link">Browse</Link>
        )}
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Profile' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        {/* <Link className="nav-link" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
