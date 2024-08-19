import React, { useEffect, useRef, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddItem = ({ uList, updateList }) => {
    const [newItem, setItem] = useState('');
    const [bulkItems, setBulkItems] = useState('');
    const textRef = useRef();

    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        addOne();
    };

    function addToList(i, updatedList) {
        const newItemObj = {
            listId: uList.listInfo.id,
            item: i,
            itemOrder: updatedList.items.length + 1 // Update itemOrder to reflect current length
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

    function bulkAdd() {
        let updatedList = { ...uList };

        const items = bulkItems.split(/\r?\n/);
        items.forEach(i => {
            if (i.trim() !== '') {
                updatedList = addToList(i, updatedList); // Add each item to the updated list
            }
        });

        updateList(updatedList); // Call updateList only once with all items added
        setBulkItems(''); // Clear the bulk input field
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        id="new-item"
                        label="New Item"
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
            <br />
            <Accordion sx={{
                mx: 'auto',
                mt: 2,
                border: '1px solid',
                borderColor: 'primary.darker',
                borderRadius: 2,
            }}>
                <AccordionSummary>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography fontSize={"large"} color={'primary.main'}>Add Items in Bulk</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={"small"} color={'primary.darker'} sx={{ paddingBottom: 1 }}>
                        Separate items by new line.
                    </Typography>
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        id="bulk-add"
                        label="Bulk add"
                        variant="outlined"
                        value={bulkItems}
                        onChange={(e) => setBulkItems(e.target.value)}
                        fullWidth
                        multiline
                        minRows={3}
                        InputProps={{
                            sx: {
                                height: '112px',
                                borderColor: 'primary.darker',
                            },
                        }}
                    />
                    <Button
                        variant={"outlined"}
                        p={1}
                        fullWidth
                        onClick={bulkAdd}>Add items</Button>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default AddItem;
