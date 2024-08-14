import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListAlt from '@mui/icons-material/ListAltTwoTone';
import Add from '@mui/icons-material/AddTwoTone';
import Person from '@mui/icons-material/PersonTwoTone';
import InfoIcon from '@mui/icons-material/InfoTwoTone';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "./AuthContext";

export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [user]);

    const goToOverviewPage = () => {
        navigate('/web/overview');
    }

    const goToNewListPage = () => {
        navigate('/web/newlist');
    };

    const goToProfilePage = () => {
        navigate('/web/profile');
    };
    const goToLoginPage = () => {
        navigate('/');
    };

    const goToAboutPage = () => {
        navigate('/web/about');
    };


    return (
        <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000}} elevation={5}>


            {loggedIn ? (
                <BottomNavigation
                    sx={{ borderTop: '1px solid ',
                        borderColor: 'primary.darker', boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.15)', paddingTop: 1}}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Lists" icon={<ListAlt/>} onClick={goToOverviewPage}/>
                    <BottomNavigationAction label="New List" icon={<Add/>} onClick={goToNewListPage}/>
                    <BottomNavigationAction label="Profile" icon={<Person/>} onClick={goToProfilePage}/>
                    </BottomNavigation>
                    ) : (
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="About" icon={<InfoIcon/>} onClick={goToAboutPage}/>
                        <BottomNavigationAction label="Login" icon={<Person/>} onClick={goToLoginPage}/>
                    </BottomNavigation>
                    )}

                </Box>
            );
            }
