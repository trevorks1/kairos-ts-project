import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Grid, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };
  let history = useHistory();

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Profile';
  }

  const clickToNav = (url) => (event) => {
    history.push(url);
  };

  return (
    <div className="nav">
      <Grid container spacing={1} justify="space-between" alignItems="center">
        <Grid item>
          <Link to="/home">
            <img className="nav-logo" src="kairoslogo.png" alt="kairos" />
          </Link>
        </Grid>
        <Grid item className="nav-right">
          <Grid container spacing={1} justify="flex-end" alignItems="center">
            {/* the About link for organization seems pointless because with 
        auth redirect they end up getting directed to /user 
        we might have address this*/}

            {props.store.user.access_level_id === 2 && (
              <Grid item>
                <Button
                  size="medium"
                  color="secondary"
                  to="/home"
                  onClick={clickToNav('/about')}
                >
                  About
                </Button>
              </Grid>
            )}
            {props.store.user.id == null && (
              <Grid item>
                <Button
                  size="medium"
                  color="secondary"
                  onClick={clickToNav('/browse-causes')}
                >
                  Browse
                </Button>
              </Grid>
            )}
            {props.store.user.access_level_id === 3 && (
              <Grid item>
                <Button
                  size="medium"
                  color="secondary"
                  onClick={clickToNav('/browse-causes')}
                >
                  Browse
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                color="secondary"
                size="medium"
                className="nav-link"
                onClick={clickToNav('/user')}
                to={loginLinkData.path}
              >
                {/* Show this link if they are logged in or not,
          but call this link 'Profile' if they are logged in,
          and call this link 'Login / Register' if they are not */}
                {loginLinkData.text}
              </Button>
            </Grid>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.store.user.id && (
              <>
                {/* <Link className="nav-link" to="/info">

              Info Page
            </Link> */}
                <Grid item>
                  <LogOutButton className="nav-link" />
                </Grid>
              </>
            )}
            {/* Always show this link since the about page is not protected */}
            {/* <Link className="nav-link" to="/about">
          About
        </Link> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
