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
        const newList = {
            ...list,
            editors: newRole === "EDITOR"
                ? [...editors, user].filter(u => !viewers.includes(u))
                : editors.filter((editor) => editor !== user),
            viewers: newRole === "VIEWER"
                ? [...viewers, user].filter(u => !editors.includes(u))
                : viewers.filter((viewer) => viewer !== user),
        };
        console.log("updating users in HandleUsers, ", JSON.stringify(newList));
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
            <Accordion>
                <AccordionSummary
                    id="panel-header"
                    aria-controls="panel-content"
                    sx={{backgroundColor: "primary.main"}}
                >
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Typography p={1} fontSize={"large"}>Users</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <br/>
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
                            No users, only you have access to this list.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    id="panel-header"
                    aria-controls="panel-content"
                    sx={{backgroundColor: "primary.main"}}
                >
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Typography p={1} fontSize={"large"}>Add User</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                                defaultValue={"VIEWER"}
                                onChange={handleNewUserRoleChange}
                                inputProps={{
                                    name: "role",
                                    id: "uncontrolled-native",
                                }}
                                sx={{width: "100%"}}
                            >
                                <option value={"VIEWER"}>Viewer</option>
                                <option value={"EDITOR"}>Editor</option>
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
                    <Typography  color={"error"}> {errorMessage}</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default HandleUsers;
