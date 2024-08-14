import React, {useContext, useState} from 'react';
import {
    Box, IconButton
} from '@mui/material';
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EditDialog from "./EditDialog";
import CheckListDisplay from "./CheckListDisplay";
import BasicList from "./BasicList";
import GroupIcon from "@mui/icons-material/Group";
import {AuthContext} from "../AuthContext";
import EditItems from "./EditItems";
import AddItem from "./AddItem";
import ViewerOptions from "./ViewerOptions";
import PageHeader from "./PageHeader";


const ListDisplay = ({uList, updateList}) => {
    const {user} = useContext(AuthContext);
    const [locked, setLocked] = useState(true);
    const [editRights, setEditRights] = useState(() => {
        return user.username === uList.owner || uList.editors.includes(user.username);
    });

    const toggleLocked = () => {
        setLocked(!locked);
    };

    function getListType(type) {
        switch (type.listInfo.type) {
            case 'CHECK':
                return <CheckListDisplay uList={uList} updateList={updateList}/>;
            default:
                return <BasicList uList={uList}/>;
        }
    }

    const users = () => {
        if (uList.owner === user.username && uList.editors.length === 0 && uList.viewers.length === 0) {
            return <br/>
        } else {
            const editorsAndViewers = [...uList.editors, ...uList.viewers].join(", ");
            const allUsers = uList.owner + ", " + editorsAndViewers

            return (
                <>
                    <GroupIcon sx={{verticalAlign: 'middle', mr: 1}}/>
                    {allUsers}
                </>
            );
        }
    }

    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}} variant="contained">


                <Box>
                    <PageHeader title={uList.listInfo.listName}></PageHeader>
                    <Box sx={{display: 'grid', border: '1px solid ',
                        borderColor: 'primary.darker', borderRadius: 2, m: 2}}>
                        <Box sx={{marginBottom: 2, gridRow: '1', gridColumn: "1 / 2", m: 1}}>
                            <Typography fontSize={"large"} sx={{fontFamily: 'Garamond', textAlign: 'left'}}>
                                {uList.listInfo.listDesc}
                                <br/>
                            </Typography>
                        </Box>
                        <Box sx={{gridRow: '1', gridColumn: '3'}}>
                            <IconButton variant="outlined" onClick={toggleLocked}>
                                {locked ? <LockIcon sx={{color: 'secondary.main'}} /> : <LockOpenIcon sx={{color: 'secondary.main'}}/>}
                            </IconButton>

                            {editRights ? (<EditDialog uList={uList} updateList={updateList}></EditDialog>) : (
                                <ViewerOptions uList={uList}></ViewerOptions>)}

                        </Box>
                        <Typography sx={{gridRow: '2', gridColumn: '1 / 3', textAlign: 'left', p: 1}}>
                            {users()}
                        </Typography>
                    </Box>
                </Box>
                {locked ? (
                    <Box>{getListType(uList)}</Box>
                ) : (
                    <EditItems uList={uList} updateList={updateList}/>
                )}

                {editRights && (<AddItem uList={uList} updateList={updateList}></AddItem>)}
            </Box>
        </>
    );
};

export default ListDisplay;
