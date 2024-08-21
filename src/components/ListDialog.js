import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
} from '@mui/material';
import Typography from "@mui/material/Typography";
import EditListDetails from "./EditListDetails";
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import PublicListSettings from "./PublicListSettings";
import HandleUsers from "./HandleUsers";
import ViewOnlyUsers from "./ViewOnlyUsers";
import BulkAdd from "./BulkAdd";

const apiCaller = new ApiCaller()
const ListDialog = ({uList, updateList, dialog, setDialog, option}) => {
    const {loginDetails, user} = useContext(AuthContext);
    const [listCopy, setCopy] = useState({...uList})
    const [canSave, setCanSave] = useState(true)
    const navigate = useNavigate();


    useEffect(() => {
        const saveCheck = () => {
            const saveOptions = ["manageUsers", "editListInfo",]
            return saveOptions.includes(option);
        }
        setCanSave(saveCheck())
    }, [option]);

    function closeDialog() {
        setDialog(false);
    }

    function deleteUsers() {
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
    }

    function saveAndClose() {
        if (option === "manageUsers") {
            deleteUsers();
        }
        updateList(listCopy)
        setDialog(false);
    }

    function getOption() {
        switch (option) {
            case "manageUsers":
                return <><HandleUsers list={listCopy} updateCopy={setCopy}></HandleUsers></>
            case "editListInfo":
                return <><EditListDetails list={listCopy} updateCopy={setCopy}></EditListDetails></>
            case "deleteList":
                return deleteDialog()
            case "leaveList":
                return leaveDialog()
            case "userInfo":
                return <><ViewOnlyUsers uList={listCopy}></ViewOnlyUsers></>
            case "bulkAdd":
                return <><BulkAdd uList={uList} updateList={updateList}></BulkAdd></>
            case "publicSettings":
                return <><PublicListSettings uList={uList} updateList={updateList}></PublicListSettings></>
        }
    }

    function getTitle() {
        switch (option) {
            case "manageUsers":
                return "Manage Users"
            case "editListInfo":
                return "Edit Info"
            case "deleteList":
                return "Delete List"
            case "leaveList":
                return "Leave List"
            case "userInfo":
                return "Users"
            case "bulkAdd":
                return "Add Multiple Items"
            case "publicSettings":
                return "Public List Settings"
        }
    }

    function deleteDialog() {
        return <><Typography textAlign={'center'} p={1}>Warning: <br/>Deleting a list cannot be
            reversed.</Typography>
            <Button onClick={deleteList} variant={"contained"} sx={{padding: 2}}
                    color={"warning"} fullWidth>Delete list</Button></>
    }

    async function deleteList() {
        await apiCaller.sendDelete("list", uList.listInfo.id, loginDetails)
        setDialog(false)
        navigate(`/web/overview`);
    }

    function leaveDialog() {
        return <> <Typography textAlign={'center'} p={1}>Warning: <br/>If you want to come back, the owner
            will have to add you again.</Typography>
            <Button onClick={leaveList} variant={"contained"} sx={{padding: 2}}
                    color={"warning"} fullWidth>Leave list</Button></>
    }

    async function leaveList() {
        await apiCaller.sendPost("list/removeUser", {user: user.username, listId: uList.listInfo.id}, loginDetails)
        setDialog(false)
        navigate(`/web/overview`);
    }

    return (
        <>

            <Dialog
                open={dialog}
                onClose={closeDialog}
            >
                <DialogTitle textAlign={'center'}>
                    {getTitle()}
                </DialogTitle>
                <DialogContent>

                    {getOption()}

                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button onClick={closeDialog} variant="contained">
                        Close
                    </Button>

                    {canSave && (<Button onClick={saveAndClose} variant="contained">
                        Save Changes
                    </Button>)}

                </DialogActions>

            </Dialog>

        </>
    );
};

export default ListDialog;
