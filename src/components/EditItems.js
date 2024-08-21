import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import ListItemText from "@mui/material/ListItemText";
import {DragIndicator} from '@mui/icons-material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import {CircularProgress} from "@mui/material";

const api = new ApiCaller()

const EditItems = ({uList, updateList}) => {
    const {loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        setLoading('');
    }, [uList]);
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const copyList = [...uList.items];
        const [reorderItem] = copyList.splice(startIndex, 1);
        copyList.splice(endIndex, 0, reorderItem);
        copyList.forEach((item, index) => {
            item.itemOrder = index + 1;
        });
        uList.items = copyList;
        updateList(uList);
    };


    const removeItem = async (item) => {
        setLoading(item)
        const updated = await api.sendDelete("list/item", item, loginDetails)

        updateList(updated);
    };

    return (
        <>
            <List>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="items">
                        {(droppableProvider) => (
                            <Box
                                ref={droppableProvider.innerRef}
                                {...droppableProvider.droppableProps}
                            >
                                {uList.items.map((item, index) => (
                                    <Draggable
                                        index={index}
                                        key={item.id}
                                        draggableId={item.id + ""}
                                    >
                                        {(draggableProvider) => (
                                            <ListItem
                                                ref={draggableProvider.innerRef}
                                                {...draggableProvider.draggableProps}
                                                {...draggableProvider.dragHandleProps}
                                                sx={{
                                                    cursor: 'pointer',
                                                    border: '1px solid ',
                                                    borderColor: 'primary.darker',
                                                    marginTop: '5px',
                                                    borderRadius: '5px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',

                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Box>
                                                        <DragIndicator/>
                                                    </Box>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.item}
                                                              primaryTypographyProps={{fontSize: '18px'}}/>
                                                {loading === item ? (<CircularProgress></CircularProgress>) : (<IconButton edge="end" aria-label="delete"
                                                                                                                  onClick={() => removeItem(item)}>
                                                    <ClearIcon/>
                                                </IconButton>) }
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvider.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </>
    );
};

export default EditItems;
