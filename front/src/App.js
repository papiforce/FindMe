import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js';
import Register from './components/Register.js';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/connexion" component={Login} />
      <Route path="/produit/creation" component={Create} />
      <Route path="/produit/modification" component={Edit} />
      <Route path="/inscription" component={Register} />
    </Router>
  );
}

export default App;
