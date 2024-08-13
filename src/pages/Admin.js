import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../AuthContext";
import Box from "@mui/material/Box";
import {CircularProgress, Typography} from "@mui/material";
import {ApiCaller} from "../ApiCaller";

const apiCaller = new ApiCaller();

const Admin = () => {
    const {user, loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getData = async () => {
            try {
                const result = await apiCaller.sendGet("admin", loginDetails)
                setData(result)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getData()


    }, [])

    return (
        <>
            <Typography fontSize={"xx-large"} sx={{fontFamily: 'Garamond'}}>Admin page</Typography>
            <Box maxWidth={300} sx={{mx: 'auto'}}>

                {loading ? (
                    <CircularProgress/>
                ) : (
                    <Box  sx={{
                        width: 300,
                        mx: 'auto',
                        mt: 4,
                        paddingTop: 1,
                        paddingBottom: 1,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        boxShadow: 2,
                    }}>
                        <Typography>Users : {data.users}</Typography>
                        <Typography>Lists : {data.lists}</Typography>
                        <Typography>Items : {data.items}</Typography>
                        <Typography>Shared lists : {data.sharedLists}</Typography>
                    </Box>
                )}

            </Box>


        </>
    );
};

export default Admin;
