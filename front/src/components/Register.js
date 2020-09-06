import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectLogin: false,
      username: "",
      email: "",
      password: "",
      message: "",
      open: false
    }
  }

  componentDidMount() {
    document.title = "FindMe | Inscription";
    var auth = JSON.parse(localStorage.getItem('user'));

    if(auth) {
      this.setState({ redirect: true });
    }
  }

  setUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  setEmail = event => {
    this.setState({
      email: event.target.value
    });
  }

  setPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  signUp = () => {
    axios({
      method: 'POST',
      url: `http://localhost:4000/users/register`,
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(res => {
      this.setState({ redirectLogin: true });
    })
    .catch(function(err) {
      console.log(err.message);
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    if(this.state.redirect) {
      return <Redirect to="/" />
    }

    if(this.state.redirectLogin) {
      return <Redirect to="/connexion" />
    }

    return (
      <Fragment>
        <div className="loginApp">
          <header className="loginApp-header">
            <Typography color="primary" variant="h2">FindMe</Typography>
            <div className="Login">
                <TextField
                  variant="standard"
                  placeholder="Pseudo"
                  margin="normal"
                  required
                  onChange={this.setUsername}
                  value={this.state.username}
                />
                <TextField
                  variant="standard"
                  placeholder="Email"
                  margin="normal"
                  required
                  onChange={this.setEmail}
                  value={this.state.email}
                />
                <TextField
                  variant="standard"
                  placeholder="Mot de passe"
                  margin="normal"
                  required
                  type="password"
                  onChange={this.setPassword}
                  value={this.state.password}
                />

                <div className="Button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.signUp();
                    }}
                  >
                    S'inscrire
                  </Button>
                </div>
              <div>
                <Typography>
                  <Link href="/connexion">
                    Déjà inscrit? Se connecter
                  </Link>
                </Typography>
              </div>
            </div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Sign In</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
          </header>
        </div>
      </Fragment>
    );
  }
}

export default Register;
