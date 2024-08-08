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

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const CheckListDisplay = ({ uList, updateList }) => {

    function getCheckStatus(status) {
        switch (status) {
            case '1':
                return <CheckBoxIcon />;
            default:
                return <CheckBoxOutlineBlankIcon />;
        }
    }

    const handleItemClick = (itemId) => {
        const updatedItems = uList.items.map((item) =>
            item.id === itemId
                ? { ...item, status: item.status === '1' ? '' : '1' }
                : item
        );

        updateList({ ...uList, items: updatedItems });
    };

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

                        }}
                        onClick={() => handleItemClick(item.id)} // Add onClick handler here
                    >
                        <ListItemAvatar>
                            <Box>
                                {getCheckStatus(item.status)}
                            </Box>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.item}
                            primaryTypographyProps={{ fontSize: '18px' }}
                        />
                        <IconButton edge="end" >
                            <Icon></Icon>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default CheckListDisplay;
