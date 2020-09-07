import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
});

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectHome: false,
      redirectProfile: false
    }
  }

  logout = event => {
    localStorage.removeItem('user');
    this.setState({ redirect: true });
  }

  render() {
    const { classes } = this.props;

    if(this.state.redirect) {
      return <Redirect to="/connexion" />
    }

    if(this.state.redirectHome) {
      return <Redirect to="/" />
    }

    if(this.state.redirectProfile) {
      return <Redirect to="/profil" />
    }

    var buttonHome = null;
    if(window.location.href.split('/').pop() !== "") {
      buttonHome = (
        <Fragment>
          <ListItem button onClick={() => {this.setState({ redirectHome: true })}}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Collection" />
          </ListItem>
        </Fragment>
      )
    } else {
      buttonHome = (
        <Fragment>
          <ListItem button>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Collection" />
          </ListItem>
        </Fragment>
      )
    }

    var buttonProfile = null;
    if(window.location.href.split('/').pop() !== "profil") {
      buttonProfile = (
        <Fragment>
          <ListItem button onClick={() => {this.setState({ redirectProfile: true })}}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItem>
        </Fragment>
      )
    } else {
      buttonProfile = (
        <Fragment>
          <ListItem button>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItem>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              FindMe
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {buttonHome}
            </List>
            <Divider />
            <List>
              {buttonProfile}
              <ListItem button onClick={this.logout}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Déconnexion" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Navbar);
