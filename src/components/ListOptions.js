import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import ListDialog from './ListDialog';

const ListOptions = ({ uList, updateList }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [dialogOption, setDialogOption] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        setIsPublic(uList.listInfo.uuid !== null);
    }, [uList]);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const openDialog = (option) => {
        setDialogOption(option);
        setDialogOpen(true);
        handleMenuClose();
    };

    const renderMenuItems = () => {
        const commonItems = [
            { text: 'User Information', action: () => openDialog('userInfo'), roles: ['viewers','editors'] },
            { text: 'Bulk Add Items', action: () => openDialog('bulkAdd'), roles: ['owner', 'editors'] },
            { text: 'Edit List Information', action: () => openDialog('editListInfo'), roles: ['owner', 'editors'] },
            { text: 'Go to Public Page', action: () => navigate(`/web/public/${uList.listInfo.uuid}`), roles: ['viewers', 'editors'], condition: isPublic },
            { text: 'Leave List', action: () => openDialog('leaveList'), roles: ['viewers', 'editors'] },
            { text: 'Handle Users', action: () => openDialog('manageUsers'), roles:['owner'] },
            { text: 'Edit Public Settings', action: () => openDialog('publicSettings'), roles:['owner'] },
            { text: 'Delete List', action: () => openDialog('deleteList'), roles: ['owner'] }
        ];


        const ownerItems = commonItems.filter(item => item.roles.includes('owner'));
        const editorItems = commonItems.filter(item => item.roles.includes('editors'));
        const viewerItems = commonItems.filter(item => item.roles.includes('viewers'));

        if (uList.owner === user.username) {
            return ownerItems;
        } else if (uList.editors !== null && uList.editors.includes(user.username)) {
            return editorItems;
        } else if (uList.viewers !== null && uList.viewers.includes(user.username)) {
            return viewerItems;
        }

        return [];
    };

    return (
        <>
            <IconButton
                sx={{ position: 'sticky', top: 0, right: 0, color: 'primary.lighter', fontSize: 'large' }}
                id="basic-button"
                aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                onClick={handleMenuClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                {renderMenuItems().map(({ text, action, condition = true }) =>
                    condition && <MenuItem key={text} onClick={action}>{text}</MenuItem>
                )}
            </Menu>

            <ListDialog
                uList={uList}
                updateList={updateList}
                dialog={dialogOpen}
                setDialog={setDialogOpen}
                option={dialogOption}
            />
        </>
    );
};

export default ListOptions;
