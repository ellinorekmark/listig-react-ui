import React, { useContext, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PageHeader from "../components/PageHeader";
import { ThemeContext } from "../ThemeContext";
import NewPassword from "../components/NewPassword";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [prettyDate, setPrettyDate] = useState("");
    const navigate = useNavigate();
    const date = new Date(user.memberSince);

    function formatDate() {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        setPrettyDate(formatDate());

    }, [theme, toggleTheme]);

    const handleLogout = async () => {
        logout();
        navigate(`/`);
    };


    return (
        <>
            <Box maxWidth={300} sx={{ mx: 'auto' }}>
                <Box sx={{ paddingTop: 2 }} >
                    <PageHeader title={"Profile"}></PageHeader>

                    <Button
                        variant="outlined"
                        sx={{ mt: 1, p: 1 }}
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? (
                            <DarkModeIcon sx={{ color: 'secondary.main' }} />
                        ) : (
                            <LightModeIcon sx={{ color: 'secondary.main' }} />
                        )}
                    </Button>

                    <Box sx={{
                        width: 300,
                        mx: 'auto',
                        mt: 2,
                        border: '1px solid',
                        borderColor: 'primary.darker',
                        borderRadius: 2,
                    }}>
                        <Typography fontSize={"large"} sx={{ fontFamily: 'Garamond' }}>
                            Username:
                        </Typography>
                        <Typography sx={{ marginBottom: 1 }}>
                            {user.username}
                        </Typography>
                        <Typography fontSize={"large"} sx={{ fontFamily: 'Garamond' }}>
                            Email:
                        </Typography>
                        <Typography sx={{ marginBottom: 1 }}>
                            {user.email}
                        </Typography>
                        <Typography fontSize={"large"} sx={{ fontFamily: 'Garamond' }}>
                            Member since:
                        </Typography>
                        <Typography sx={{ marginBottom: 1 }}>
                            {prettyDate}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    width: 300,
                    mx: 'auto',
                    mt: 2,
                }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 1,
                            p: 1
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button><br /><br />

                    <NewPassword></NewPassword>

                </Box>
            </Box>
        </>
    );
};

export default Profile;
