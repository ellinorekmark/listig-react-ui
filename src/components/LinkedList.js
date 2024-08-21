import React, {useContext, useState} from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Icon, DialogTitle, DialogContent, DialogActions, Button, Dialog, TextField,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SettingsIcon from '@mui/icons-material/Settings';
import {AuthContext} from "../AuthContext";

const LinkedList = ({uList, updateList}) => {
    const {user} = useContext(AuthContext);
    const [editRights, setEditRights] = useState(() => {
        return user.username === uList.owner || uList.editors.includes(user.username);
    });


    const [dialog, setDialog] = useState(false)
    const [selected, setSelected] = useState("")
    const [selectedURL, setSelectedURL] = useState("")
    const [copied, setCopied] = useState(false)

    function openInNewTab(url) {
        if (url !== "") {
            window.open(url, '_blank', 'noopener,noreferrer');
        }

    }

    function openSettings(item) {
        setSelected(item);
        setSelectedURL(item.itemStatus)
        setDialog(true)
    }

    function saveAndClose() {
        const updatedItems = uList.items.map((item) =>
            item.id === selected.id
                ? {...item, itemStatus: selectedURL}
                : item
        );
        updateList({...uList, items: updatedItems});
        setDialog(false);
    }

    const closeDialog = () => {
        setDialog(false)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(selectedURL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
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
                    >
                        <ListItemAvatar onClick={() => openInNewTab(item.itemStatus)}>
                            {item.itemStatus !== "" && <OpenInNewIcon></OpenInNewIcon>}
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.item}
                            primaryTypographyProps={{fontSize: '18px'}}
                            onClick={() => openInNewTab(item.itemStatus)}
                        />
                        <IconButton edge="end" onClick={() => openSettings(item)}>
                            <SettingsIcon></SettingsIcon>
                        </IconButton>
                    </ListItem>


                ))}
            </List>
            <Dialog
                open={dialog}
                onClose={closeDialog}
            >
                <DialogTitle textAlign={'center'}>
                    Edit link
                </DialogTitle>
                <br/>
                {selectedURL !== "" &&
                <Button variant="outlined" fullWidth onClick={copyToClipboard}>
                    {copied ? "Link Copied!" : "Copy Link"}
                </Button>
            }
                <DialogContent>


                    {editRights ? (<TextField label="Edit Link"
                                              value={selectedURL}
                                              onChange={(e) => setSelectedURL(e.target.value)}
                    ></TextField>) : (
                        <TextField label="Link"
                                   value={selectedURL}
                        ></TextField>
                    )}


                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>


                    <Button onClick={() => {
                        setDialog(false)
                    }} variant="contained">
                        Close
                    </Button>
                    {editRights && (<Button onClick={() => {
                        saveAndClose()
                    }} variant="contained">
                        Save
                    </Button>)}


                </DialogActions>

            </Dialog>
        </>
    );
};

export default LinkedList;
