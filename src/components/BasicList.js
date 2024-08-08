import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Icon
} from '@mui/material';

const BasicList = ({uList}) => {

    return (
        <>
            <List>
                {uList.items.map((item) => (
                    <ListItem
                        key={item.id}
                        sx={{
                            cursor: 'pointer',
                            border: '1px solid #ccc',
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
                        <IconButton edge="end">
                            <Icon></Icon>
                        </IconButton>
                    </ListItem>
                ))}
            </List>

        </>
    );
};

export default BasicList;
