import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ErrorIcon from '@material-ui/icons/Error';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import AddIcon from '@material-ui/icons/Add';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Navbar from "./Navbar.js";

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100%',
  },
  root2: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(3),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: 'center',
  },
  center: {
    margin: theme.spacing(2, 2, 0),
  },
  order: {
    display: 'flex',
  }
});

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectEdit: false,
      products: []
    }

    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    document.title = "FindMe | Accueil";
    var auth = JSON.parse(localStorage.getItem('user'));
    console.log(auth);

    if(!auth || auth === null) {
      this.setState({ redirect: true });
    }

    this.products();
  }

  products() {
    var auth = JSON.parse(localStorage.getItem('user'));
    if(auth !== null) {
      axios({
        method: 'GET',
        url: 'http://localhost:4000/products/',
        headers: {
          Authorization: `Bearer ${auth.data.token}`
        }
      })
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }

  delete(e) {
    var auth = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'DELETE',
      url: `http://localhost:4000/products/${e.target.id}`,
      headers: {
        Authorization: `Bearer ${auth.data.token}`
      }
    })
    .then(response => {
      this.products();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/connexion" />;
    }

    if(this.state.redirectHome) {
      return <Redirect to="/produit/modification" />;
    }

    const { classes } = this.props;
    var auth = JSON.parse(localStorage.getItem('user'));
    var add = null;

    if(auth !== null) {
      if(auth.data.role === "SUPER_ADMIN") {
        add = (
          <Fragment>
            <Link color="primary" className="addLink" href="/produit/creation"><AddIcon />
              Ajouter un produit
            </Link>
          </Fragment>
        );
      } else {
        add = null;
      }
    }

    const productList = this.state.products.length ? (
      this.state.products.map(product => {
        var icon = null;

        if(product.type === "phone") {
          icon = <SmartphoneIcon />
        } else if (product.type === "tablet") {
          icon = <TabletMacIcon />
        } else {
          icon = <DesktopMacIcon />
        }

        var availability = null;

        if(product.available === true) {
          availability = "Disponible";
        } else {
          availability = "Indisponible";
        }

        var command = null;

        if(auth.data.role === "SUPER_ADMIN") {
          command = (
            <Fragment>
              <IconButton edge="end" aria-label="edit" href={`produit/modification/${product.id}`}>
                <EditIcon id={product.id} />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={this.delete}>
                <DeleteOutlineRoundedIcon id={product.id} />
              </IconButton>
            </Fragment>
          );
        } else {
          command = null;
        }

        return (
          <Fragment>
              <div key={product.id}>
                <div className={classes.demo}>
                  <List className={classes.order}>
                    <ListItemAvatar className={classes.center}>
                      <Avatar>
                        {icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.center}
                      primary={`${product.name} — ${product.price}€`}
                      secondary={product.type.charAt(0).toUpperCase() + product.type.slice(1) + " — " + product.warranty_years + " an(s) de garantie (Note: " + product.rating + "/5)"}
                    />
                    <ListItemSecondaryAction>
                      {availability}
                      {command}
                    </ListItemSecondaryAction>
                  </List>
                </div>
              </div>
          </Fragment>
        );
      })
    ) : (
      <div className={classes.demo}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ErrorIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Aucun produit dans la collection :( !"
            />
          </ListItem>
        </List>
      </div>
    )

    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <main className={classes.content}>
            <Toolbar />
            <div className={classes.root2}>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Tous les produits ({this.state.products.length})
                </Typography>
                {add}
                {productList}
              </Grid>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Home);
