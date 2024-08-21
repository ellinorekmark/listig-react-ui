import React, {useContext, useState} from 'react';
import {
    Box, IconButton
} from '@mui/material';
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckListDisplay from "./CheckListDisplay";
import BasicList from "./BasicList";
import GroupIcon from "@mui/icons-material/Group";
import {AuthContext} from "../AuthContext";
import EditItems from "./EditItems";
import AddItem from "./AddItem";
import PageHeader from "./PageHeader";
import ListOptions from "./ListOptions";
import ListDesc from "./ListDesc";


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
            return <></>
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

                    <ListDesc uList={uList}></ListDesc>

                    <Typography sx={{gridRow: '2', gridColumn: '1 / 3', textAlign: 'left', p: 1}}>
                        {users()}
                    </Typography>

                </Box>
                <Box sx={{
                    border: '1px solid ',
                    borderColor: 'primary.darker'
                }}>
                    <Box sx={{backgroundColor: "primary.darker", display: 'flex', justifyContent: 'flex-end',}}>
                        {editRights && (
                            <IconButton variant="outlined" onClick={toggleLocked}>
                                {locked ? <LockIcon sx={{color: 'primary.lighter'}}/> :
                                    <LockOpenIcon sx={{color: 'primary.lighter'}}/>}
                            </IconButton>
                        )}
                        <ListOptions uList={uList} updateList={updateList}></ListOptions>
                    </Box>


                    {locked ? (
                        <Box>{getListType(uList)}</Box>
                    ) : (
                        <EditItems uList={uList} updateList={updateList}/>
                    )}

                    {editRights && (<AddItem uList={uList} updateList={updateList}></AddItem>)}
                </Box>
            </Box>
        </>
    );
};

export default ListDisplay;
