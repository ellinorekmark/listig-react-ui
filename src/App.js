import React, { useContext } from 'react';
import './App.css';
import Nav from './Nav.js';
import AppRouter from './Router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { ThemeContext } from './ThemeContext';

function App() {
    const { selectedTheme } = useContext(ThemeContext);

    return (
            <ThemeProvider theme={selectedTheme}>
                <CssBaseline />
                <div className="App">
                    <Router>
                        <AppRouter />
                        <Nav />
                    </Router>
                    <br /><br /><br />
                </div>

            </ThemeProvider>
    );
}

export default App;
