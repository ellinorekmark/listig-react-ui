import React, {useContext, useState} from 'react';
import {AuthContext} from "../AuthContext";
import {CircularProgress, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const {user, login, logout, loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {

        setLoading(true)
        if (await login(username, password) === true) {
            navigate(`/overview`);
        } else {
            setLoading(false)
            alert("Unable to log in")
        }

    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    return (
        <>
            <h1>Home Page</h1>
            <Box
                sx={{
                    width: 300,
                    mx: 'auto',
                    mt: 2,
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <h2>Login</h2>
                <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1,
                p: 1}}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                )}
            </Box>

        </>
    );
};

export default Home;
