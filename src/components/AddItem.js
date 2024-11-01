import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Button, CircularProgress,
    TextField, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddItem = ({uList, updateList}) => {
    const [newItem, setItem] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const textRef = useRef();

    useEffect(() => {
        setLoading(false);
    }, [uList]);

    const handleSubmit = (event) => {

        event.preventDefault();
        setLoading(true);
        addOne();


    };

    function addToList(i, updatedList) {
        const newItemObj = {
            listId: uList.listInfo.id,
            item: i,
            itemOrder: updatedList.items.length + 1,
            itemStatus: status
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
        setStatus('');
        textRef.current.focus();
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <TextField
                            inputProps={{maxLength: 200}}
                            id="new-item"
                            autoComplete='off'
                            label="Add to List"
                            variant="outlined"
                            value={newItem}
                            onChange={(e) => setItem(e.target.value)}
                            fullWidth
                            sx={{height: '56px',}}
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
                        {uList.listInfo.type === "LINK" && (
                            <TextField
                                inputProps={{maxLength: 200}}
                                id="new-item"
                                label="URL"
                                variant="outlined"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                fullWidth
                                sx={{height: '56px',}}
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
                        )}
                    </Box>
                    {loading ? (<CircularProgress></CircularProgress>) : (<Button
                        type={"submit"}
                        variant="outlined"
                        sx={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            minWidth: '56px',
                            height: uList.listInfo.type === 'LINK' ? '112px' : '56px'
                        }}
                    >
                        <AddIcon/>
                    </Button>)}

                </Box>
            </form>
        </>
    );
};

export default AddItem;
