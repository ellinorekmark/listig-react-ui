import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    IconButton,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    AccordionSummary,
    Accordion,
    AccordionDetails
} from '@mui/material';
import Typography from "@mui/material/Typography";
import EditListDetails from "./EditListDetails";
import EditIcon from "@mui/icons-material/Edit";
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import PageHeader from "./PageHeader";

const apiCaller = new ApiCaller()
const EditDialog = ({uList, updateList}) => {
    const {loginDetails, user} = useContext(AuthContext);
    const [dialog, setDialog] = useState(false);
    const [listCopy, setCopy] = useState({...uList})
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setIsOwner(ownsList)
    }, [user]);

    function openDialog() {
        setDialog(true);
    }

    function closeDialog() {
        setDialog(false);
    }

    function ownsList() {
        return uList.owner === user.username;
    }


    function saveAndClose() {
        let deletedEditors = [];
        let deletedViewers = [];

        if (uList.editors !== listCopy.editors) {
            deletedEditors = uList.editors.filter(editor => !listCopy.editors.includes(editor));
        }

        if (uList.viewers !== listCopy.viewers) {
            deletedViewers = uList.viewers.filter(viewer => !listCopy.viewers.includes(viewer));
        }

        const deletedUsers = deletedEditors.concat(deletedViewers)

        deletedUsers.forEach(user => {
            apiCaller.sendPost("list/removeUser", {user: user, listId: uList.listInfo.id}, loginDetails)
        });
        console.log("This is the updated, copy:", JSON.stringify(listCopy))
        updateList(listCopy)
        setDialog(false);
    }

    async function deleteList() {
        await apiCaller.sendDelete("list", uList.listInfo.id, loginDetails)
        setDialog(false)
        navigate(`/web/overview`);
    }

    function updateCopy(newCopy) {
        setCopy(newCopy)
    }
    async function leaveList() {
        await apiCaller.sendPost("list/removeUser", {user: user.username, listId: uList.listInfo.id}, loginDetails)
        setDialog(false)
        navigate(`/web/overview`);
    }

    return (
        <>
            <IconButton variant="outlined" onClick={openDialog} sx={{color: 'secondary.main'}}>
                <EditIcon />
            </IconButton>

            <Dialog
                fullScreen
                open={dialog}
                onClose={closeDialog}
            >
                <DialogTitle textAlign={'center'}>
                    <PageHeader title={"Edit List"}></PageHeader>
                </DialogTitle>
                <DialogContent>
                    <Box maxWidth={400} sx={{
                        mx: 'auto',
                        cursor: 'pointer',
                        border: '1px solid ',
                        borderColor: 'primary.darker',
                        marginTop: '5px',
                        borderRadius: '5px',
                    }} variant="contained">

                        <EditListDetails list={listCopy} updateCopy={updateCopy}></EditListDetails>
                        {isOwner ? (
                            <Accordion>
                                <AccordionSummary id="panel-header" aria-controls="panel-content"
                                                  sx={{backgroundColor: "primary.main"}} >
                                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                        <Typography p={1} fontSize={"large"}>Delete list</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{justifyContent: 'center'}}>
                                    <Typography textAlign={'center'} p={1}>Warning: <br/>Deleting a list cannot be
                                        reversed.</Typography>
                                    <Button onClick={deleteList} variant={"contained"} sx={{padding: 2}}
                                            color={"warning"} fullWidth >Delete list</Button>
                                </AccordionDetails>
                            </Accordion>
                        ): (
                            <Accordion>
                                <AccordionSummary id="panel-header" aria-controls="panel-content"
                                                  sx={{backgroundColor: "primary.darker"}}>
                                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                        <Typography p={1} fontSize={"large"}>Leave</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{justifyContent: 'center'}}>
                                    <Typography textAlign={'center'} p={1}>Warning: <br/>If you want to come back, the owner
                                        will have to add you again.</Typography>
                                    <Button onClick={leaveList} variant={"contained"} sx={{padding: 2}}
                                            color={"warning"} fullWidth>Leave list</Button>
                                </AccordionDetails>
                            </Accordion>
                        )}

                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button onClick={closeDialog} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={saveAndClose} variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>

            </Dialog>

        </>
    );
};

export default EditDialog;
