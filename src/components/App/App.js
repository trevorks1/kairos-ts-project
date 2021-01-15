import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { } from '@material-ui/core/colors';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../../pages/AboutPage/AboutPage';
import UserPage from '../../pages/UserPage/UserPage';
import InfoPage from '../../pages/InfoPage/InfoPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterOrganization from '../../pages/RegisterOrganization/RegisterOrganization';
import RegisterVolunteer from '../../pages/RegisterVolunteer/RegisterVolunteer';
import BrowseCausesPage from '../../pages/BrowseCausesPage/BrowseCausesPage';
import BrowseActivitiesPage from '../../pages/BrowseActivitiesPage/BrowseActivitiesPage';
import ActivityDetailsPage from '../../pages/ActivityDetailsPage/ActivityDetailsPage';

import './App.css';

const customTheme = createMuiTheme({
  // theme settings
  palette: {
    // type: 'dark',
    primary: {
      main: '#FF4D53',
    },
    secondary: {
      // light: '',
      main: '#FFFFFF',
      // dark: '',
      // contrastText: '',
    },
    // error: deepOrange,
    // warning: lime,
    info: { main: '#FE7942' },
    // success: green,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
                component={AboutPage}
              />

              {/* Browse Page (visible logged in or not) */}
              <Route exact path="/browse-causes" component={BrowseCausesPage} />

              <Route
                exact
                path="/browse/:id"
                component={BrowseActivitiesPage}
              />

              <Route
                exact
                path="/view-activity/:id"
                component={ActivityDetailsPage}
              />

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/user"
                component={UserPage}
              />

              <ProtectedRoute
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/info"
                component={InfoPage}
              />

              {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
              <ProtectedRoute
                // with authRedirect:
                // - if logged in, redirects to "/user"
                // - else shows LoginPage at /login
                exact
                path="/login"
                component={LoginPage}
                authRedirect="/user"
              />
              <Route
                // with authRedirect:
                // - if logged in, redirects to "/user"
                // - else shows RegisterPage at "/registration"
                exact
                path="/registration"
                component={RegisterOrganization}
              />
              <Route
                // with authRedirect:
                // - if logged in, redirects to "/user"
                // - else shows RegisterPage at "/registration"
                exact
                path="/registration-volunteer"
                component={RegisterVolunteer}
              />
              <ProtectedRoute
                // with authRedirect:
                // - if logged in, redirects to "/user"
                // - else shows LandingPage at "/home"
                exact
                path="/home"
                component={LandingPage}
                authRedirect="/user"
              />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
