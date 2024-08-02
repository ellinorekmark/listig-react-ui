import React, {useContext, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const Profile = () => {
    const {user, login, logout, loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [prettyDate, setPrettyDate] = useState("")

    const navigate = useNavigate();

    const date = new Date(user.memberSince);
    function formatDate(){
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        setPrettyDate(formatDate)

    })

    const handleLogout = async () => {
        logout()
        navigate(`/`);
    };
    return (
        <>
            <Box maxWidth={300} sx={{ mx: 'auto' }}>
                <Box sx={{ paddingTop: 2 }} >
                    <Typography fontSize={"xx-large"} sx={{ fontFamily: 'Garamond' }}>
                        Profile
                    </Typography>
                    <br />

                    <Box sx={{
                        width: 300,
                        mx: 'auto',
                        mt: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,

                    }}>
                        <Typography fontSize={"large"} sx={{fontFamily: 'Garamond'}}>
                            Username:
                        </Typography>
                        <Typography sx={{marginBottom: 1}}>
                            {user.username}
                        </Typography>

                        <Typography fontSize={"large"} sx={{fontFamily: 'Garamond'}}>
                            Email:
                        </Typography>
                        <Typography sx={{marginBottom: 1}}>
                            {user.email}
                        </Typography>
                        <Typography fontSize={"large"} sx={{fontFamily: 'Garamond'}}>
                            Member since:
                        </Typography>
                        <Typography sx={{marginBottom: 1}}>
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
                    </Button>
                </Box>



            </Box>


        </>
    );
};

export default Profile;
