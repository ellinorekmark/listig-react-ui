import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'light';
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme, setTheme]);

    const lightTheme = useMemo(() => createTheme({
        palette: {
            primary: {
                lighter: '#a092ef',
                main: '#675bac',
                darker: '#37358f'
            },
            secondary: {
                main: '#5b78ac',
                lighter: '#ac5ba0',
                darker: '#905bac'
            },
            mode: "light",
        },
    }), []);

    const darkTheme = useMemo(() => createTheme({
        palette: {
            primary: {
                lighter: '#c9c4e1',
                main: '#8177ba',
                darker: '#433d99'
            },
            secondary: {
                main: '#7990ba',
                lighter: '#bc76b1',
                darker: '#bc76b1'
            },
            mode: "dark",
        },
    }), []);

    const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, selectedTheme, toggleTheme }}>
            <ThemeProvider theme={selectedTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProviderWrapper;
