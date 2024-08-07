import React, { useContext, useState } from 'react';
import { AuthContext } from "../AuthContext";
import {Card, CardActions, CardContent, CircularProgress, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {ApiCaller} from "../ApiCaller";

const apiCaller = new ApiCaller();


const Home = () => {
    const { login, createAccount } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [nameTaken, setNameTaken] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        if (await login(username, password) === true) {
            navigate(`/overview`);
        } else {
            setLoading(false);
            alert("Unable to log in");
        }
    };

    const handleCreateAccount = async () => {
        setLoading(true);
        const usernameExists = await apiCaller.sendPostNoLogin("user/userExists", {username: newUsername});

        if(!usernameExists){
            let account = await createAccount({ username: newUsername, email, password: newPassword, passwordConfirm, memberSince: "" });
            if(account === true){
                console.log("account created")
                navigate(`/overview`);
            }
            else {
                setLoading(false);
                alert("Unable to create account");
            }
        }
        else{
            setNameTaken(true);
            setLoading(false);
        }

    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [newUsername, setNewUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <>
            <h1>Home Page</h1>
            <Card
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
                <CardContent>
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
                </CardContent>
                <CardActions>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1, p: 1 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    )}
                </CardActions>
            </Card>

            <Card
                sx={{
                    width: 300,
                    mx: 'auto',
                    mt: 4,
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <CardContent>
                    <h2>Create Account</h2>
                    <TextField
                        fullWidth
                        id="new-username"
                        label="Username"
                        variant="outlined"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    {nameTaken && (<Typography color={"error"}>Username unavailable.</Typography>)}
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="new-password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="password-confirm"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1, p: 1 }}
                            onClick={handleCreateAccount}
                        >
                            Create Account
                        </Button>
                    )}
                </CardActions>
            </Card>
            <br /><br/><br />
        </>
    );
};

export default Home;
