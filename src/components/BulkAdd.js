import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    TextField,
    Typography
} from "@mui/material";

const BulkAdd = ({ uList, updateList }) => {
    const [bulkItems, setBulkItems] = useState('');
    const [added, setAdded] = useState(0);
    const textRef = useRef();

    useEffect(() => {

    }, []);



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

    function bulkAdd() {
        let updatedList = { ...uList };

        const items = bulkItems.split(/\r?\n/);
        let count = 0;
        items.forEach(i => {
            if (i.trim() !== '') {
                updatedList = addToList(i, updatedList);
                count++;
            }
        });

        updateList(updatedList);
        setBulkItems('');
        setAdded(count);
    }

    return (
        <>

                    <Typography fontSize={"small"} sx={{ paddingBottom: 1 }}>
                        Separate items by new line.
                    </Typography>
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        autoComplete="off"
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
            {added >0  && (<Typography> {added} items added to list.</Typography>)}

        </>
    );
};

export default BulkAdd;
