import React, {useContext, useEffect, useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    FormControl, MenuItem, Select, TextField, Typography,
    IconButton, Box, Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import HandleUsers from "./HandleUsers";



const EditListDetails = ({list, updateCopy}) => {
    const {loginDetails, user} = useContext(AuthContext);
    const [listId, setId] = useState("");
    const [title, setTitle] = useState("");
    const [listType, setType] = useState("");
    const [desc, setDesc] = useState("");
    const [createdDate, setCreated] = useState("");
    const [owner, setOwner] = useState("");




    useEffect(() => {
        setId(list.listInfo.id);
        setTitle(list.listInfo.listName);
        setType(list.listInfo.type);
        setDesc(list.listInfo.listDesc);
        setOwner(list.owner);
        setCreated(list.listInfo.createdAt);
    }, [list]);

    const handleTypeChange = (event) => {
        setType(event.target.value);
        updateCopy(list)
    };



    return (
        <>

                <Accordion>
                    <AccordionSummary id="panel-header" aria-controls="panel-content"
                                      sx={{backgroundColor: "primary.main"}}>
                        List Details
                    </AccordionSummary>
                    <AccordionDetails>
                        <br/>
                        <TextField
                            inputProps={{maxLength: 40}}
                            id="list-title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{marginBottom: 1}}
                        />
                        <TextField
                            inputProps={{maxLength: 40}}
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
                            </Select>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <HandleUsers list={list} updateCopy={updateCopy}></HandleUsers>


        </>
    );
};

export default EditListDetails;
