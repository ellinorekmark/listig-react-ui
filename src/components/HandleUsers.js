import React, {useContext, useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    FormControl, MenuItem, Select, TextField, Typography,
    IconButton, Box, Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";

const apiCaller = new ApiCaller();

function Spinner() {
    return null;
}

const HandleUsers = ({list, updateCopy}) => {
    const {loginDetails} = useContext(AuthContext);
    const [newUser, setNewUser] = useState("");
    const [newUserRole, setNewUserRole] = useState("VIEWER");
    const [userCheckLoading, setUserLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const editors = list.editors || [];
    const viewers = list.viewers || [];

    const handleRoleChange = (user, newRole) => {
        let newEditors = [...editors];
        let newViewers = [...viewers];

        if (newRole === "EDITOR") {
            newViewers = newViewers.filter(viewer => viewer !== user);
            if (!newEditors.includes(user)) {
                newEditors.push(user);
            }
        } else if (newRole === "VIEWER") {
            newEditors = newEditors.filter(editor => editor !== user);
            if (!newViewers.includes(user)) {
                newViewers.push(user);
            }
        }

        const newList = {
            ...list,
            editors: newEditors,
            viewers: newViewers,
        };

        updateCopy(newList);
    };


    const handleRemoveUser = (user) => {
        const newList = {
            ...list,
            editors: editors.filter((editor) => editor !== user),
            viewers: viewers.filter((viewer) => viewer !== user),
        };
        updateCopy(newList);
    };

    const addUser = async () => {
        setUserLoading(true);
        setErrorMessage("");

        try {
            const result = await apiCaller.sendPost("user/userExists", {username: newUser}, loginDetails);

            if (result === true) {
                const newList = {
                    ...list,
                    editors: newUserRole === "EDITOR" ? [...editors, newUser] : editors,
                    viewers: newUserRole === "VIEWER" ? [...viewers, newUser] : viewers,
                };
                setNewUser("");
                setNewUserRole("VIEWER");
                updateCopy(newList);
            } else {
                setErrorMessage("The username does not exist.");
            }
        } catch (e) {
            setErrorMessage("An error occurred while checking the username.");
        } finally {
            setUserLoading(false);
        }
    };

    const handleNewUserRoleChange = (event) => {
        setNewUserRole(event.target.value);
    };

    return (
        <>
                    {editors.length > 0 || viewers.length > 0 ? (
                        <>
                            {editors.map((user, index) => (
                                <Box key={index} sx={{display: "flex", alignItems: "center", marginBottom: 1}}>
                                    <Typography sx={{flexGrow: 1, marginLeft: 2}}>{user}</Typography>
                                    <FormControl sx={{width: 100, marginRight: 2}}>
                                        <Select
                                            value="EDITOR"
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                        >
                                            <MenuItem value="EDITOR">Editor</MenuItem>
                                            <MenuItem value="VIEWER">Viewer</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton onClick={() => handleRemoveUser(user)} color="error">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                            ))}
                            {viewers.map((user, index) => (
                                <Box key={index} sx={{display: "flex", alignItems: "center", marginBottom: 1}}>
                                    <Typography sx={{flexGrow: 1, marginLeft: 2}}>{user}</Typography>
                                    <FormControl sx={{width: 100, marginRight: 2}}>
                                        <Select
                                            value="VIEWER"
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                        >
                                            <MenuItem value="EDITOR">Editor</MenuItem>
                                            <MenuItem value="VIEWER">Viewer</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton onClick={() => handleRemoveUser(user)} color="error">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                            ))}
                        </>
                    ) : (
                        <Typography sx={{marginLeft: 2}}>
                            List is currently private.
                        </Typography>
                    )}
<br />
            <Accordion>
                <AccordionSummary
                    id="panel-header"
                    aria-controls="panel-content"

                >
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Typography fontSize={"large"}>Add User</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl sx={{maxWidth: 350, marginBottom: 2}}>
                        <TextField
                            inputProps={{maxLength: 50}}
                            id="new-item"
                            label="Username"
                            variant="outlined"
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)}
                            fullWidth
                        />
                    </FormControl>
                    <Box sx={{display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 350}}>
                        <FormControl sx={{width: "48%"}}>
                            <Select
                                value={newUserRole}
                                onChange={handleNewUserRoleChange}
                                inputProps={{
                                    name: "role",
                                    id: "uncontrolled-native",
                                }}
                                sx={{width: "100%"}}
                            >
                                <MenuItem value={"VIEWER"}>Viewer</MenuItem>
                                <MenuItem value={"EDITOR"}>Editor</MenuItem>
                            </Select>
                        </FormControl>
                        {userCheckLoading ? (
                            <Spinner/>
                        ) : (
                            <Button onClick={addUser} variant={"outlined"} sx={{height: "56px", width: "48%"}}>
                                Add User
                            </Button>
                        )}

                    </Box>
                    <br/>
                    <Typography color={"error"}> {errorMessage}</Typography>
</AccordionDetails>
</Accordion>
        </>
    );
};

export default HandleUsers;
