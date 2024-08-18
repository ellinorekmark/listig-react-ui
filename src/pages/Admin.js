import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../AuthContext";
import Box from "@mui/material/Box";
import {Accordion, AccordionDetails, AccordionSummary, CircularProgress, TextField, Typography} from "@mui/material";
import {ApiCaller} from "../ApiCaller";
import Button from "@mui/material/Button";

const apiCaller = new ApiCaller();

const Admin = () => {
    const {user, loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUsers] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await apiCaller.sendGet("admin", loginDetails)
                setData(result)
                const users = await apiCaller.sendGet("admin/users", loginDetails)
                setUsers(users)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    const handleReset = async () => {
        setPostLoading(true)
        try {
            await apiCaller.sendPost("admin/resetPassword", {"username": username, "password": password}, loginDetails)
        } catch (e) {
            console.log("failed. ", e)
        } finally {
            setPostLoading(false);
        }
    };

    return (
        <>
            <Typography fontSize={"xx-large"} sx={{fontFamily: 'Garamond'}}>Admin page</Typography>
            <Box maxWidth={300} sx={{mx: 'auto'}}>

                {loading ? (
                    <CircularProgress/>
                ) : (<>
                        <Box sx={{
                            width: 300,
                            mx: 'auto',
                            mt: 4,
                            paddingTop: 1,
                            paddingBottom: 1,
                            border: '1px solid',
                            borderColor: 'primary.darker',
                            borderRadius: 2,
                            boxShadow: 2,
                        }}>
                            <Typography>Users : {data.users}</Typography>
                            <Typography>Lists : {data.lists}</Typography>
                            <Typography>Items : {data.items}</Typography>
                            <Typography>Shared lists : {data.sharedLists}</Typography>
                        </Box>
                        <Box sx={{
                            width: 300,
                            mx: 'auto',
                            mt: 4,
                            paddingTop: 1,
                            paddingBottom: 1,
                            border: '1px solid',
                            borderColor: 'primary.darker',
                            borderRadius: 2,
                            boxShadow: 2,
                        }}>
                            {userInfo.map((user) => (
                                <Typography>{user.username} - {user.email}</Typography>
                            ))}
                        </Box>

                        <Box maxWidth={300} sx={{mx: 'auto'}}>
                            <br/>
                            <Accordion sx={{
                                mx: 'auto',
                                mt: 2,
                                border: '1px solid',
                                borderColor: 'primary.darker',
                                borderRadius: 2,
                            }}>
                                <AccordionSummary>
                                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                        <Typography>Reset User Password</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
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
                                    {postLoading ? (
                                        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                                            <CircularProgress/>
                                        </Box>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            sx={{mt: 1, p: 1}}
                                            onClick={handleReset}>
                                            Change password
                                        </Button>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default Admin;
