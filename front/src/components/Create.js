import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar.js";
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

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
});

export class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      name: '',
      type: '',
      price: '',
      rating: '',
      warranty_years: '',
      available: '',
      success: ''
    }
  }

  componentDidMount() {
    document.title = "FindMe | Création";
    var auth = JSON.parse(localStorage.getItem('user'));

    if(!auth || auth.data.role !== "SUPER_ADMIN") {
      this.setState({ redirect: true });
    }
  }

  setName = event => {
    this.setState({
      name: event.target.value
    });
  };

  setType = event => {
    this.setState({
      type: event.target.value
    });
  };

  setPrice = event => {
    this.setState({
      price: event.target.value
    });
  };

  setRating = event => {
    this.setState({
      rating: event.target.value
    });
  };

  setWarrantyYears = event => {
    this.setState({
      warranty_years: event.target.value
    });
  };

  setAvailable = event => {
    this.setState({
      available: event.target.value
    });
  };

  addProduct = () => {
    var auth = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'POST',
      url: `http://localhost:4000/products/`,
      headers: {
        Authorization: `Bearer ${auth.data.token}`
      },
      data: {
        name: this.state.name,
        type: this.state.type,
        price: this.state.price,
        rating: this.state.rating,
        warranty_years: this.state.warranty_years,
        available: this.state.available
      }
    })
    .then(res => {
      this.setState({
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: '',
        success: `Produit correctement ajouté à la collection!`
      });
    })
    .catch(function(err) {
      console.log(err.message);
    })
  }

  render() {
    const { classes } = this.props;

    if(this.state.redirect) {
      return <Redirect to="/connexion" />
    }

    var alert = null;
    if(this.state.success !== '') {
      alert = <Alert severity="success">{this.state.success}</Alert>;
    }

    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <main className={classes.content}>
            <Toolbar />
            <div className={classes.root2}>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Ajouter un produit
                </Typography>
                {alert}
                <div className="loginApp">
                  <div className="Login">
                    <TextField
                      variant="standard"
                      placeholder="Nom du produit"
                      margin="normal"
                      required
                      onChange={this.setName}
                      value={this.state.name}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="type">Type</InputLabel>
                      <Select
                        labelId="type"
                        id="type"
                        label="Type"
                        autoWidth
                        onChange={this.setType}
                        value={this.state.type}
                      >
                        <MenuItem value="">
                          <em>Type</em>
                        </MenuItem>
                        <MenuItem value={"phone"}>Phone</MenuItem>
                        <MenuItem value={"tablet"}>Tablet</MenuItem>
                        <MenuItem value={"pc"}>PC</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="standard-number"
                      label="Prix"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.setPrice}
                      value={this.state.price}
                    />
                    <TextField
                      id="standard-number"
                      label="Note"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.setRating}
                      value={this.state.rating}
                    />
                    <TextField
                      id="standard-number"
                      label="Année(s) de garantie"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.setWarrantyYears}
                      value={this.state.warranty_years}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="available">Disponibilité</InputLabel>
                      <Select
                        labelId="available"
                        id="available"
                        label="available"
                        autoWidth
                        onChange={this.setAvailable}
                        value={this.state.available}
                      >
                        <MenuItem value="">
                          <em>Disponibilité</em>
                        </MenuItem>
                        <MenuItem value={false}>Indisponible</MenuItem>
                        <MenuItem value={true}>Disponible</MenuItem>
                      </Select>
                    </FormControl>
                    <div className="Button">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.addProduct();
                        }}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Create);
