import React, {createContext, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, CircularProgress} from '@mui/material';
import EditableList from '../EditableList';
import ListDisplay from "../ListDisplay";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {AuthContext} from "../AuthContext";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {ApiCaller} from "../ApiCaller";
import Typography from "@mui/material/Typography";

const apiCaller = new ApiCaller();

const ViewList = () => {
    const {id} = useParams();
    const [locked, setLocked] = useState(true);

    const toggleLocked = () => {
        setLocked(!locked);
    };
    const {loginDetails} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [uList, setList] = useState(null);
    const [stompClient, setStompClient] = useState(null);


    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await apiCaller.sendGet(`list/${id}`, loginDetails);
                setList(data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchList();

        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe(`/topic/list/${id}`, (message) => {
                    const updatedItem = JSON.parse(message.body);
                    setList(prevList => ({
                        ...prevList,
                        items: prevList.items.map(item =>
                            item.id === updatedItem.id ? updatedItem : item
                        )
                    }));
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }


        });
        socket.onclose = function (event) {
            console.error('WebSocket is closed now.', event);
        };

        socket.onerror = function (event) {
            console.error('WebSocket error observed:', event);
        };


        client.activate();
        setStompClient(client);

        return () => {
            if (client && client.connected) {
                client.deactivate();
            }
        };
    }, [loginDetails]);

    const updateList = (newList) => {
        console.log("New List: " + JSON.stringify(newList.items))


        if (stompClient && stompClient.connected) {
            stompClient.publish(`/app/list/${id}`, {}, JSON.stringify(newList));
            console.log("Sent update to WebSocket");
        }
    };

    return (
        <>


            {loading ? <Box><CircularProgress/><Typography>Loading List</Typography></Box> :
                <Box maxWidth={750} sx={{mx: 'auto'}} variant="contained">
                    <Box
                        sx={{position: 'relative',}}
                    >
                        <Box sx={{marginTop: 2,}}>

                            <Typography fontSize={"xx-large"}  sx={{
                                fontFamily: 'Garamond',
                            }}>
                                {uList.listInfo.listName}
                            </Typography><br />

                        </Box>


                            <Box  sx={{mt: 2}} onClick={toggleLocked}
                                  sx={{
                                      position: 'absolute',
                                      top: 8,
                                      right: 8,
                                  }}>

                                {locked ? <LockIcon  sx={{cursor: 'pointer'}} onClick={toggleLocked}/> : <LockOpenIcon />}
                            </Box>
                        <Box sx={{marginBottom: 2}}>
                            <Typography fontSize={"large"} sx={{  fontFamily: 'Garamond'}} >
                                {uList.listInfo.listDesc}
                            </Typography>
                        </Box>
                        </Box>

                    {locked ? <ListDisplay uList={uList} updateList={updateList}/> :
                        <EditableList uList={uList} updateList={updateList}/>}

                </Box>
            }
        </>
    );
};

export default ViewList;

