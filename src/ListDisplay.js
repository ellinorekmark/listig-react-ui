import React from 'react';
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {useState} from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import {Typography} from "@mui/material";
import {DragIndicator} from "@mui/icons-material";


let dummyList = JSON.parse('[{"id": "1","title": "eat","completed": "false"},{"id": "2","title": "sleep","completed": "false"},{"id": "3","title": "study","completed": "true"}]');
const EditableList = () => {



    const {id} = useParams();
    return (
        <>
            <List>
                {dummyList.map((item) => (
                    <ListItem
                        key={item.id}

                        sx={{ cursor: 'pointer',
                            border: '1px solid ',
                            margin: '5px',
                            borderRadius: '5px' ,
                        }} >
                        <ListItemAvatar>
                            <Box>
                            </Box>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.title}
                        />

                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default EditableList;
