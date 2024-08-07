import React, {useContext, useState} from 'react';
import {AuthContext} from "../AuthContext";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button,
    FormControl, IconButton,
    MenuItem,
    Select, TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ApiCaller} from "../ApiCaller";

const apiCaller = new ApiCaller()


function Spinner() {
    return null;
}

const HandleUsers = ({ list, updateCopy }) => {
    const { loginDetails, user } = useContext(AuthContext);
    const [editors, setEditors] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [newUser, setNewUser] = useState("");
    const [newUserRole, setNewUserRole] = useState("VIEWER");
    const [userCheckLoading, setUserLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoleChange = (user, newRole) => {
        if (newRole === "EDITOR") {
            setEditors((prev) => [...prev, user]);
            setViewers((prev) => prev.filter((viewer) => viewer !== user));
        } else if (newRole === "VIEWER") {
            setViewers((prev) => [...prev, user]);
            setEditors((prev) => prev.filter((editor) => editor !== user));
        }
        console.log("updating users in HandleUsers, ", JSON.stringify(list))
        updateCopy(list)
    };

    const handleRemoveUser = (user) => {
        setEditors((prev) => prev.filter((editor) => editor !== user));
        setViewers((prev) => prev.filter((viewer) => viewer !== user));
        updateCopy(list)
    };

    const addUser = async () => {
        setUserLoading(true);
        setErrorMessage("");

        try {
            const result = await apiCaller.sendPost("user/userExists", { username: newUser }, loginDetails);

            if (result === true) {
                if (newUserRole === "EDITOR") {
                    setEditors((prev) => [...prev, newUser]);
                } else {
                    setViewers((prev) => [...prev, newUser]);
                }
                setNewUser("");
                setNewUserRole("VIEWER");
            } else {
                setErrorMessage("The username does not exist.");
            }
        } catch (e) {
            setErrorMessage("An error occurred while checking the username.");
        } finally {
            setUserLoading(false);
            console.log("updating users in HandleUsers, ", JSON.stringify(list))

            updateCopy(list)
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
                    sx={{ backgroundColor: "primary.main" }}
                >
                    Users
                </AccordionSummary>
                <AccordionDetails>
                    <br />
                    {editors.length > 0 || viewers.length > 0 ? (
                        <>
                            {editors.map((user, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                                    <Typography sx={{ flexGrow: 1, marginLeft: 2 }}>{user}</Typography>
                                    <FormControl sx={{ width: 100, marginRight: 2 }}>
                                        <Select
                                            value="EDITOR"
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                        >
                                            <MenuItem value="EDITOR">Editor</MenuItem>
                                            <MenuItem value="VIEWER">Viewer</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton onClick={() => handleRemoveUser(user)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                            {viewers.map((user, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                                    <Typography sx={{ flexGrow: 1, marginLeft: 2 }}>{user}</Typography>
                                    <FormControl sx={{ width: 100, marginRight: 2 }}>
                                        <Select
                                            value="VIEWER"
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                        >
                                            <MenuItem value="EDITOR">Editor</MenuItem>
                                            <MenuItem value="VIEWER">Viewer</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton onClick={() => handleRemoveUser(user)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </>
                    ) : (
                        <Typography sx={{ marginLeft: 2 }}>
                            No users, only you have access to this list.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    id="panel-header"
                    aria-controls="panel-content"
                    sx={{ backgroundColor: "primary.main" }}
                >
                    Add User
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <FormControl fullWidth sx={{ maxWidth: 350, marginBottom: 2 }}>
                        <TextField
                            inputProps={{ maxLength: 50 }}
                            id="new-item"
                            label="Username"
                            variant="outlined"
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)}
                            fullWidth
                        />
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 350 }}>
                        <FormControl sx={{ width: "48%" }}>
                            <Select
                                defaultValue={"VIEWER"}
                                onChange={handleNewUserRoleChange}
                                inputProps={{
                                    name: "role",
                                    id: "uncontrolled-native",
                                }}
                                sx={{ width: "100%" }}
                            >
                                <option value={"VIEWER"}>Viewer</option>
                                <option value={"EDITOR"}>Editor</option>
                            </Select>
                        </FormControl>
                        {userCheckLoading ? (
                            <Spinner />
                        ) : (
                            <Button onClick={addUser} variant={"outlined"} sx={{ height: "56px", width: "48%" }}>
                                Add User
                            </Button>
                        )}

                        <Typography> {errorMessage}</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default HandleUsers;
