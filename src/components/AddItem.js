import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const ListTypeSorter = ({uList, updateList}) => {
    const [newItem, setItem] = useState('');

    const addToList = () => {
        if (newItem.trim() === '') return;
        const newItemObj = {
            listId: uList.listInfo.id,
            item: newItem
        };

        const updatedList = {
            ...uList,
            items: [...uList.items, newItemObj]
        };

        updateList(updatedList);

        setItem('');
    };

    return (
        <>

            <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                <TextField
                    inputProps={{maxLength: 33}}
                    id="new-item"
                    label="New Item"
                    variant="outlined"
                    value={newItem}
                    onChange={(e) => setItem(e.target.value)}
                    fullWidth
                    sx={{height: '56px'}}
                    InputProps={{
                        sx: {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                            height: '56px',
                        }
                    }}
                />
                <Button
                    onClick={addToList}
                    variant="contained"
                    sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        height: '56px',
                        minWidth: '56px',
                    }}
                >
                    <AddIcon/>
                </Button>
            </Box>

        </>
    );
};

export default ListTypeSorter;





