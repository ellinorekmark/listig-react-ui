import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box,  CircularProgress} from '@mui/material';
import {AuthContext} from "../AuthContext";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {ApiCaller} from "../ApiCaller";
import Typography from "@mui/material/Typography";

import ListDisplay from "../components/ListDisplay";

const apiCaller = new ApiCaller();

const ViewList = () => {
    const {id} = useParams();

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

        setList(newList)

        if (stompClient && stompClient.connected) {
            stompClient.publish(`/app/list/${id}`, {}, JSON.stringify(newList));
            console.log("Sent update to WebSocket");
        }
    };

    return (
        <>
            {loading ? (
                <Box>
                    <CircularProgress/>
                    <Typography>Loading List</Typography>
                </Box>
            ) : (

                <ListDisplay uList={uList} updateList={updateList}></ListDisplay>

            )}
        </>
    );
};
export default ViewList;

