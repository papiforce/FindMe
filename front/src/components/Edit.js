import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
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
import axios from 'axios';

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

export class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      product: [],
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
    document.title = "FindMe | Modification";
    var auth = JSON.parse(localStorage.getItem('user'));

    if(!auth || auth.data.role !== "SUPER_ADMIN") {
      this.setState({ redirect: true });
    }

    this.product();
  }

  product() {
    var id = window.location.href.split('/').pop();
    var auth = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'GET',
      url: `http://localhost:4000/products/${id}`,
      headers: {
        Authorization: `Bearer ${auth.data.token}`
      }
    })
    .then(res => {
      this.setState({ product: res.data.data });
    })
    .catch(function(err) {
      console.log(err.message);
    })
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

  updateProduct = () => {
    var id = window.location.href.split('/').pop();
    var auth = JSON.parse(localStorage.getItem('user'));
    var name = this.state.name;
    var type = this.state.type;
    var price = this.state.price;
    var rating = this.state.rating;
    var warranty_years = this.state.warranty_years;
    var available = this.state.available;

    if(!name) {
      name = this.state.product.name;
    }

    if(!type) {
      type = this.state.product.type;
    }

    if(!price) {
      price = this.state.product.price;
    }

    if(!rating) {
      rating = this.state.product.rating;
    }

    if(!warranty_years) {
      warranty_years = this.state.product.warranty_years;
    }

    if(!available) {
      available = this.state.product.available;
    }

    axios({
      method: 'PUT',
      url: `http://localhost:4000/products/${id}`,
      headers: {
        Authorization: `Bearer ${auth.data.token}`
      },
      data: {
        name: name,
        type: type,
        price: price,
        rating: rating,
        warranty_years: warranty_years,
        available: available
      }
    })
    .then(res => {
      this.setState({success: `Produit correctement modifié!`});
      this.product();
    })
    .catch(function(err) {
      console.log(err);
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
                  Modifier le produit — {this.state.product.name}
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
                        <MenuItem value={"false"}>Indisponible</MenuItem>
                        <MenuItem value={"true"}>Disponible</MenuItem>
                      </Select>
                    </FormControl>
                    <div className="Button">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.updateProduct();
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
    )
  }
}

export default withStyles(useStyles)(Edit);
