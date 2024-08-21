import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";



const PageHeader = ({title}) => {

    return (
        <>
            <Box sx={{ paddingTop: 2, paddingRight:5, paddingLeft:5}}>
                <Typography fontSize={"xx-large"} sx={{ fontFamily: 'Garamond', color:'primary.main'}}>
                    <strong>{title}</strong>
                </Typography>
                <br />
            </Box>

        </>
    );
};

export default PageHeader;



