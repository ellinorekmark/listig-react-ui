import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const ViewOnlyUsers = ({uList}) => {

    return (
        <>
            <Box p={2}>
                <Box sx={{display: 'flex'}}>
                    <Typography fontSize={"large"} sx={{fontFamily: 'Garamond'}}
                                minWidth={100}><strong>Owner: </strong></Typography>
                    <Typography fontSize={"large"}>{uList.owner}</Typography>

                </Box>
                {!uList.editors || uList.editors.length !== 0 && (
                    <Box sx={{display: 'flex'}} >
                        <Typography fontSize={"large"} sx={{fontFamily: 'Garamond'}}
                                    minWidth={100}><strong>Editors: </strong></Typography>
                        <Box>
                            {uList.editors.map((user) => (<Typography  key={user} fontSize={"large"}>{user}</Typography>))}
                        </Box>
                    </Box>

                )}
                {!uList.viewers || uList.viewers.length > 0 && (
                    <Box sx={{display: 'flex'}}>
                        <Typography fontSize={"large"} sx={{fontFamily: 'Garamond'}}
                                    minWidth={100}><strong>Viewers: </strong></Typography>
                        <Box>
                            {uList.viewers.map((user) => (<Typography  key={user} fontSize={"large"}>{user}</Typography>))}
                        </Box>
                    </Box>
                )}
            </Box>


        </>
    );
};

export default ViewOnlyUsers;

