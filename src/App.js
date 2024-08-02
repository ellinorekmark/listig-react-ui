import React from 'react';
import './App.css';
import Nav from './Nav.js';
import Appbar from './Appbar.js';
import AppRouter from './Router';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";



function App() {
  return (

    <div className="App">
      <Router>

        <AppRouter />
        <Nav />
      </Router>
    </div>
  );
}

export default App;
