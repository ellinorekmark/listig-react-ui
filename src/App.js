import React from 'react';
import './App.css';
import Nav from './Nav.js';
import AppRouter from './Router';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {


    return (

        <div className="App">
            <Router>
                <AppRouter/>
                <Nav/>
            </Router>
            <br/><br/><br/><br/>
        </div>

    );
}

export default App;
