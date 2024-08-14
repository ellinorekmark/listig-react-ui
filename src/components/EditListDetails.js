import React, {useContext} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Box,
    FormControl, MenuItem, Select, TextField, Typography
} from "@mui/material";
import HandleUsers from "./HandleUsers";
import ViewOnlyUsers from "./ViewOnlyUsers";
import {AuthContext} from "../AuthContext";

const EditListDetails = ({list, updateCopy}) => {
    const {user} = useContext(AuthContext);

    const handleTypeChange = (event) => {
        const newList = {
            ...list,
            listInfo: {
                ...list.listInfo,
                type: event.target.value,
            },
        };
        updateCopy(newList);
    };

    const updateTitle = (value) => {
        const newList = {
            ...list,
            listInfo: {
                ...list.listInfo,
                listName: value,
            },
        };
        updateCopy(newList);
    };

    const updateDesc = (value) => {
        const newList = {
            ...list,
            listInfo: {
                ...list.listInfo,
                listDesc: value,
            },
        };
        updateCopy(newList);
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
                        <Typography p={1} fontSize={"large"}>List Details</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <br/>
                    <TextField
                        inputProps={{maxLength: 100}}
                        id="list-title"
                        label="Title"
                        variant="outlined"
                        value={list.listInfo.listName}
                        onChange={(e) => updateTitle(e.target.value)}
                        fullWidth
                        sx={{marginBottom: 1}}
                    />
                    <TextField
                        inputProps={{maxLength: 100}}
                        id="list-desc"
                        label="Description (optional)"
                        variant="outlined"
                        value={list.listInfo.listDesc}
                        onChange={(e) => updateDesc(e.target.value)}
                        fullWidth
                        sx={{marginBottom: 1}}
                    />
                    <FormControl>
                        <Typography>List type:</Typography>
                        <Select
                            value={list.listInfo.type}
                            onChange={handleTypeChange}
                            sx={{
                                width: 200,
                                marginBottom: 2,
                            }}
                        >
                            <MenuItem value={"BASIC"}>Normal</MenuItem>
                            <MenuItem value={"CHECK"}>Checklist</MenuItem>
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            {list.owner === user.username ? (<HandleUsers list={list} updateCopy={updateCopy}/>) : (
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
                        <ViewOnlyUsers uList={list}></ViewOnlyUsers>
                    </AccordionDetails>
                </Accordion>)}
        </>
    );
};

export default EditListDetails;