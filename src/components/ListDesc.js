import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ListDesc = ({uList}) => {

    const description = () => {
        if (uList.listInfo.listDesc !== null) {
            return <>
                <Box sx={{marginBottom: 1, gridRow: '1', gridColumn: "1 / 2", m: 1, paddingLeft: 2, paddingRight: 2}}>
                    <Typography fontSize={"large"}>
                        {uList.listInfo.listDesc}
                        <br/>
                    </Typography>
                </Box>
            </>
        }

    }

    return (
        <>
            {description()}
        </>
    );
};

export default ListDesc;

