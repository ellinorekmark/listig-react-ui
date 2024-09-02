import React, {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Box, CircularProgress, Typography} from '@mui/material';

import { ApiCaller } from "../ApiCaller";
import PageHeader from "../components/PageHeader";
import ListDesc from "../components/ListDesc";
import CheckListDisplay from "../components/CheckListDisplay";
import BasicList from "../components/BasicList";
import LinkedList from "../components/LinkedList";

const apiCaller = new ApiCaller();

const PublicListView = () => {

    const { uuid } = useParams();
    const [loading, setLoading] = useState(true);
    const [uList, setList] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await apiCaller.sendGetNoAuth(`public/${uuid}`);
                setList(data);
            } catch (error) {
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchList();

    }, [uuid]);

    function updateList(){
        //do nothing
    }

    function getListType(type) {
        switch (type.listInfo.type) {
            case 'CHECK':
                return <CheckListDisplay uList={uList} updateList={updateList} isPublic={true}/>
            case 'LINK':
                return <LinkedList uList={uList} updateList={updateList()} isPublic={true}></LinkedList>
            default:
                return <BasicList uList={uList}/>;
        }
    }


    return (
        <>
            <Box maxWidth={750} sx={{mx: 'auto'}} variant="contained">
            {loading ? (
                <Box>
                    <CircularProgress />
                    <Typography>Loading List</Typography>
                </Box>
            ) : (
                <>
                    {fetchError ? (
                        <Typography>Unable to load list.</Typography>
                    ) : (
                        <>
                        <PageHeader title={uList.listInfo.listName}></PageHeader>
                        <ListDesc uList={uList}></ListDesc>
                            <Box>{getListType(uList)}</Box>
                        </>
                    )}
                </>
            )}
        </Box>
        </>
    );
};

export default PublicListView;
