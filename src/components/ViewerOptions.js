import React, {useContext, useState} from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import {ApiCaller} from "../ApiCaller";
import {AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import ViewOnlyUsers from "./ViewOnlyUsers";

const apiCaller = new ApiCaller()


const ViewerOptions = ({uList}) => {
    const {loginDetails, user} = useContext(AuthContext);
    const [dialog, setDialog] = useState(false);
    const navigate = useNavigate();


    function openDialog() {
        setDialog(true);
    }

    function closeDialog() {
        setDialog(false);
    }

    async function leaveList() {
        await apiCaller.sendPost("list/removeUser", {user: user.username, listId: uList.listInfo.id}, loginDetails)
        setDialog(false)
        navigate(`/web/overview`);
    }


    return (
        <>
            <IconButton variant="outlined" onClick={openDialog} sx={{color: 'secondary.main'}}>
                <InfoIcon />
            </IconButton>

            <Dialog
                fullScreen
                open={dialog}
                onClose={closeDialog}
            >
                <DialogTitle><Box sx={{paddingTop: 2}}>
                    <Typography fontSize={"xx-large"} sx={{fontFamily: 'Garamond', textAlign: 'center'}}>
                        List Info
                    </Typography>
                </Box></DialogTitle>
                <DialogContent>
                    <Box maxWidth={400} sx={{
                        mx: 'auto',
                        border: '1px solid ',
                        borderColor: 'primary.darker',
                        marginTop: '5px',
                        borderRadius: '5px',
                    }} variant="contained">

                        <ViewOnlyUsers uList={uList}></ViewOnlyUsers>

                        <Accordion>
                            <AccordionSummary id="panel-header" aria-controls="panel-content"
                                              sx={{backgroundColor: "primary.main"}}>
                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <Typography p={1} fontSize={"large"}>Leave</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{justifyContent: 'center'}}>
                                <Typography textAlign={'center'} p={1}>Warning: <br/>If you want to come back, the owner
                                    will have to add you again.</Typography>
                                <Button onClick={leaveList} variant={"contained"} sx={{padding: 2}}
                                        color={"error"} fullWidth>Leave list</Button>
                            </AccordionDetails>
                        </Accordion>


                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button onClick={closeDialog} variant="contained">
                        Close
                    </Button>

                </DialogActions>

            </Dialog>

        </>
    );
};

export default ViewerOptions;
