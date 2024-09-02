import React, {useContext, useState} from 'react';
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
import {AuthContext} from "../AuthContext";

const CheckListDisplay = ({ uList, updateList, isPublic }) => {
    const {user} = useContext(AuthContext);
    const [editRights, setEditRights] = useState(() => {
        if(isPublic){
            return false
        }
        else {
            return user.username === uList.owner || uList.editors.includes(user.username);
        }
    });

    function getCheckStatus(status) {
        switch (status) {
            case '1':
                return <CheckBoxIcon sx={{color:'secondary.main'}}/>;
            default:
                return <CheckBoxOutlineBlankIcon sx={{color:'secondary.main'}} />;
        }
    }

    const handleItemClick = (itemId) => {
        if(editRights){
            const updatedItems = uList.items.map((item) =>
                item.id === itemId
                    ? { ...item, itemStatus: item.itemStatus === '1' ? '' : '1' }
                    : item
            );
            updateList({ ...uList, items: updatedItems });
        }
    };

    return (
        <>
            <List>
                {uList.items.map((item) => (
                    <ListItem
                        key={item.id}
                        sx={{
                            cursor: 'pointer',
                            border: '1px solid ',
                            borderColor: 'primary.darker',
                            marginTop: '5px',
                            borderRadius: '5px',
                        }}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <ListItemAvatar>
                            <Box>
                                {getCheckStatus(item.itemStatus)}
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
