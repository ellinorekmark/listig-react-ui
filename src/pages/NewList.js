import React, {useContext, useState} from 'react';
import {Alert, CircularProgress, FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {AuthContext} from "../AuthContext";
import {ApiCaller} from "../ApiCaller";
import {useNavigate} from "react-router-dom";
import PageHeader from "../components/PageHeader";

const apiCaller = new ApiCaller()


const NewList = () => {
    const {loginDetails, user} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [listType, setType] = useState("BASIC");
    const [desc, setDesc] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiFail, setApiFail] = useState(false);
    const navigate = useNavigate();

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    async function handleCreate() {

        if (title.trim() === "") {
            setTitleError(true);
            return;
        }
        setTitleError(false);


        setLoading(true);
        const info = {
            listName: title.trim(),
            listDesc: desc.trim(),
            type: listType
        };
        const newList = {
            listInfo: info,
            owner: user.username,
            editors: [],
            viewers: [],
            items: []
        }
        try {
            const result = await apiCaller.sendPost("list", newList, loginDetails);
            const id = result.listInfo.id;
            navigate(`/web/list/${id}`);

        } catch (e) {
            setApiFail(true)
            setLoading(false)
        }
    }

    const  getListDescription = () => {
        switch(listType){
            case "BASIC":
                return "Normal, no-frills list."
            case "CHECK":
                return "To do list, for accomplishing tasks."
            case "LINK":
                return "Linked lists, add URL links to all your items."
        }
    };
    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}} variant="contained">

                <PageHeader title={"New List"}></PageHeader>
                <br/>
                <Box>
                    <Box maxWidth={300} sx={{
                        mx: 'auto',
                        mt: 2,
                        p: 2,
                        border: '1px solid ',
                        borderColor: 'primary.darker',
                    }}>
                        <TextField
                            inputProps={{maxLength: 100}}
                            autoComplete="off"
                            id="list-title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{marginBottom: 1}}
                            error={titleError}
                            helperText={titleError ? "Title is required" : ""}
                        />
                        <TextField
                            inputProps={{maxLength: 100}}
                            id="list-desc"
                            label="Description (optional)"
                            variant="outlined"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            fullWidth
                            sx={{marginBottom: 1}}
                        />

                        <FormControl>
                            <Typography>List type:</Typography>
                            <Select
                                value={listType}
                                onChange={handleTypeChange}
                                sx={{
                                    width: 200,
                                    marginBottom: 2
                                }}
                            >
                                <MenuItem value={"BASIC"}>Normal</MenuItem>
                                <MenuItem value={"CHECK"}>Checklist</MenuItem>
                                <MenuItem value={"LINK"}>Linked</MenuItem>

                            </Select>
                        </FormControl><br />
                        {getListDescription()}

                        {loading ? (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    mt: 1,
                                    p: 1
                                }}
                                onClick={handleCreate}
                            >
                                Create
                            </Button>
                        )}

                        {apiFail ? (
                            <Alert severity="error">Failed to create list. Please try again later.</Alert>) : (
                            <Box></Box>)}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NewList;
