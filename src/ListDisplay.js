import React, {useState} from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    TextField,
    Button,
    Avatar,
    Icon
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ListDisplay = ({uList, updateList}) => {
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
            <List>
                {uList.items.map((item) => (
                    <ListItem
                        key={item.id}
                        sx={{
                            cursor: 'pointer',
                            border: '1px solid',
                            marginTop: '5px',
                            borderRadius: '5px',
                            borderColor: 'gray'
                        }}
                    >
                        <ListItemAvatar>
                            <Box>
                            </Box>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.item}
                            primaryTypographyProps={{fontSize: '18px'}}
                        />
                        <IconButton edge="end"  >
                            <Icon></Icon>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                <TextField
                    inputProps={{ maxLength: 33 }}
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
                        height: '56px',  // Match the height of the TextField
                        minWidth: '56px', // Maintain square button
                    }}
                >
                    <AddIcon/>
                </Button>
            </Box>
        </>
    );
};

export default ListDisplay;
