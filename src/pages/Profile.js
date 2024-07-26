import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from "react";

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
const initialStateTodos = JSON.parse('[{"id": "1","title": "eat","completed": "false"},{"id": "2","title": "sleep","completed": "false"},{"id": "3","title": "study","completed": "true"}]');
const ListView = () => {  const [todos, setTodos] = useState(initialStateTodos);
    useEffect(()=> {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    const handleDragEnd = (result) => {
        console.log(result)
        if(!result.destination) return;
        const startIndex = result.source.index
        const endIndex = result.destination.index
        const copyTodos = [...todos]
        const [reorderTodo] = copyTodos.splice(startIndex,1)
        copyTodos.splice(endIndex,0,reorderTodo)
        setTodos(copyTodos)
    }
    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <h1>Todo App</h1>
                <Droppable droppableId="todos">
                    {(droppableProvider) => (
                        <Box sx={{padding: 5,}}
                             ref={droppableProvider.innerRef}
                             {...droppableProvider.droppableProps}
                        >
                            {todos.map((todo, index) => (
                                <Draggable
                                    index={index}
                                    key={todo.id}
                                    draggableId={`${todo.id}`}
                                >
                                    {(draggableProvider) => (
                                        <ListItem
                                            ref={draggableProvider.innerRef}
                                            {...draggableProvider.draggableProps}
                                            {...draggableProvider.dragHandleProps}
                                            sx={{ cursor: 'pointer',
                                                border: '1px solid ',
                                                marginTop: '5px',
                                                borderRadius: '5px' ,
                                                maxWidth: 700}}
                                        >
                                            {todo.title}
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvider.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ListView;
