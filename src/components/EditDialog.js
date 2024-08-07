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

const apiCaller = new ApiCaller()
const EditDialog = ({uList, updateList}) => {
    const {loginDetails, user} = useContext(AuthContext);
    const [dialog, setDialog] = useState(false);
    const [listCopy, setCopy] = useState({...uList})
    const [isOwner, setIsOwner] = useState(false)
    const [pageTitle, setPageTitle] = useState("Edit List")
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
            apiCaller.sendPost("user/removeEditor", {user: user}, loginDetails)
        });
        console.log("This is the updated, copy:", JSON.stringify(listCopy))
        updateList(listCopy)
        setDialog(false);
    }

    async function deleteList() {
        await apiCaller.sendDelete("list", uList.listInfo.id, loginDetails)
        setDialog(false)
        navigate(`/overview`);
    }

    function updateCopy(newCopy) {
        setCopy(newCopy)
    }

    return (
        <>
            <IconButton variant="outlined" onClick={openDialog}>
                <EditIcon sx={{p: 1}}/>
            </IconButton>

            <Dialog
                fullScreen
                open={dialog}
                onClose={closeDialog}
            >
                <DialogTitle><Box sx={{paddingTop: 2}}>
                    <Typography fontSize={"xx-large"} sx={{fontFamily: 'Garamond', textAlign: 'center'}}>
                        {pageTitle}
                    </Typography>
                </Box></DialogTitle>
                <DialogContent>
                    <Box maxWidth={400} sx={{
                        mx: 'auto',
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        marginTop: '5px',
                        borderRadius: '5px',
                    }} variant="contained">

                        <EditListDetails list={listCopy} updateCopy={updateCopy}></EditListDetails>
                        {isOwner && (
                            <Accordion>
                                <AccordionSummary id="panel-header" aria-controls="panel-content"
                                                  sx={{backgroundColor: "primary.main"}}>
                                    Delete list
                                </AccordionSummary>
                                <AccordionDetails sx={{justifyContent: 'center'}}>
                                    <Typography textAlign={'center'} p={1}>Warning: <br/>Deleting a list cannot be
                                        reversed.</Typography>
                                    <Button onClick={deleteList} variant={"contained"} sx={{padding: 2}}
                                            color={"error"}>Delete list</Button>
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
