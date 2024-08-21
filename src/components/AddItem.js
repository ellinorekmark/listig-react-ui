import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddItem = ({ uList, updateList }) => {
    const [newItem, setItem] = useState('');
    const textRef = useRef();

    useEffect(() => {

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        addOne();
    };

    function addToList(i, updatedList) {
        const newItemObj = {
            listId: uList.listInfo.id,
            item: i,
            itemOrder: updatedList.items.length + 1
        };

        return {
            ...updatedList,
            items: [...updatedList.items, newItemObj]
        };
    }

    const addOne = () => {
        if (newItem.trim() === '') return;

        let updatedList = addToList(newItem, uList);
        updateList(updatedList);

        setItem('');
        textRef.current.focus();
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        id="new-item"
                        label="Add to List"
                        variant="outlined"
                        value={newItem}
                        onChange={(e) => setItem(e.target.value)}
                        fullWidth
                        sx={{ height: '56px', }}
                        inputRef={textRef}
                        InputProps={{
                            sx: {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                },
                                height: '56px',
                                borderColor: 'primary.darker',
                            },
                        }}
                    />
                    <Button
                        type={"submit"}
                        variant="outlined"
                        sx={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            height: '56px',
                            minWidth: '56px',
                        }}
                    >
                        <AddIcon />
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default AddItem;
