import React, { Component, Fragment } from 'react';
import Navbar from "./Navbar.js";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100%',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: 'center',
  },
  infos: {
    margin: theme.spacing(10, 'auto'),
    width: '50%',
    textAlign: 'center',
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      user: []
    }
  }

  componentDidMount() {
    document.title = "FindMe | Profil";

    var auth = JSON.parse(localStorage.getItem('user'));

    if(!auth || auth === null) {
      this.setState({ redirect: true });
    } else {
      this.setState({ user: auth.data });
    }
  }

  render() {
    const { classes } = this.props;

    console.log(this.state.user);
    var role = null;
    if(this.state.user.role === "SUPER_ADMIN") {
      role = "Administrateur";
    } else {
      role = "Membre";
    }

    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <main className={classes.content}>
            <Toolbar />
            <div className={classes.root2}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.title}>
                  Profil
                </Typography>
                <div className={classes.infos}>
                  <p><b>Pseudo —</b> {this.state.user.username}</p>
                  <p><b>Email —</b> {this.state.user.email}</p>
                  <p><b>Status —</b> {role}</p>
                </div>
              </Grid>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Profile);
