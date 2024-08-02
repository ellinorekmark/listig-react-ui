import React, {useContext, useState} from 'react';
import Button from "@mui/material/Button";
import {AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

const Profile = () => {
    const {user, login, logout, loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        logout()
        navigate(`/`);
    };
    return (
        <>
            <h1>Profile Page</h1>

            <Box sx={{
                width: 300,
                mx: 'auto',
                mt: 2,
                p: 2,
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
                </Button>
            </Box>

        </>
    );
};

export default Profile;
