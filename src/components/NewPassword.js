import Box from "@mui/material/Box";
import {Accordion, AccordionDetails, AccordionSummary, CircularProgress, TextField, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {AuthContext} from "../AuthContext";
import {ApiCaller} from "../ApiCaller";
import Button from "@mui/material/Button";

const api = new ApiCaller()

const NewPassword = () => {
    const {loginDetails, user, saveUser} = useContext(AuthContext);

    const [oldPassword, setOld] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeat, setRepeat] = useState("")
    const [loading, setLoading] = useState(false)
    const [misMatch, setMismatch] = useState(false)
    const [pwMisMatch, setPwMismatch] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)




    async function handleChangePassword() {
        setLoading(true)
        setPwMismatch(false)
        setMismatch(false)
        setError(false)
        const control = btoa(user.username + ':' + oldPassword)
        if (control !== loginDetails) {
            setMismatch(true)
        } else if (newPassword !== repeat) {
            setPwMismatch(true)
        } else {
            try {
                const newUser = await api.sendPost("user/newPassword", {password: newPassword}, loginDetails)
                saveUser(user.username, newPassword, newUser)
                setSuccess(true)
                setNewPassword("")
                setOld("")
                setRepeat("")
            } catch (e) {
                setError(true)
            }

        }
        setLoading(false)


    }

    return (
        <>

            <Box >
                <Accordion sx={{
                    mx: 'auto',
                    mt: 2,
                    border: '1px solid',
                    borderColor: 'primary.darker',
                    borderRadius: 2, }}>
                    <AccordionSummary>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <Typography >Change password</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {success && (<Typography color={"success"}>Password has been changed.</Typography>)}

                        <TextField
                            fullWidth
                            id="old-password"
                            label="Current Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={oldPassword}
                            onChange={(e) => setOld(e.target.value)}
                        />
                        {misMatch && (<Typography color={"error"}>Old password is incorrect.</Typography>)}
                        <TextField
                            fullWidth
                            id="new-password"
                            label="New Password"
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
                            value={repeat}
                            onChange={(e) => setRepeat(e.target.value)}
                        />
                        {pwMisMatch && (<Typography color={"error"}>Passwords don't match.</Typography>)}

                        {loading ? (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{mt: 1, p: 1}}
                                onClick={handleChangePassword}
                            >
                                Change password
                            </Button>
                        )}
                    </AccordionDetails>
                </Accordion>

            </Box>

        </>
    );
};

export default NewPassword;
