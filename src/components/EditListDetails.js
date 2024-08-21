import React, {useContext, useState} from 'react';
import {
    FormControl, MenuItem, Select, TextField, Typography
} from "@mui/material";
import {AuthContext} from "../AuthContext";

function PublicListSettings(props) {
    return null;
}

PublicListSettings.propTypes = {};
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
                {list.listInfo.type==="LINK" ? (
                    <Typography>Linked</Typography>
                ):(
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
                </Select>)}
            </FormControl>
        </>
    );
};

export default EditListDetails;
