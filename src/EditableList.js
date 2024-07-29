import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ListItemText from "@mui/material/ListItemText";
import { DragIndicator } from '@mui/icons-material';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const initialList = [
    { id: "1", title: "eat", completed: false },
    { id: "2", title: "sleep", completed: false },
    { id: "3", title: "study", completed: true }
];

const EditableList = () => {
    const [list, setList] = useState(initialList);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const copyList = [...list];
        const [reorderItem] = copyList.splice(startIndex, 1);
        copyList.splice(endIndex, 0, reorderItem);
        setList(copyList);
    };

    const removeItem = (id) => {
        const filteredList = list.filter(item => item.id !== id);
        setList(filteredList);
    };

    const { id } = useParams();
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
                                {list.map((item, index) => (
                                    <Draggable
                                        index={index}
                                        key={item.id}
                                        draggableId={item.id}
                                    >
                                        {(draggableProvider) => (
                                            <ListItem
                                                ref={draggableProvider.innerRef}
                                                {...draggableProvider.draggableProps}
                                                {...draggableProvider.dragHandleProps}
                                                sx={{
                                                    cursor: 'pointer',
                                                    border: '1px solid',
                                                    marginTop: '5px',
                                                    borderRadius: '5px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Box>
                                                        <DragIndicator />
                                                    </Box>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.title}  primaryTypographyProps={{fontSize: '18px'}} />
                                                <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                                                    <ClearIcon />
                                                </IconButton>
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

export default EditableList;
