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

        </>
    );
};

export default ListDisplay;
