import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AuthContext } from "../AuthContext";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ApiCaller } from "../ApiCaller";
import ListDisplay from "../components/ListDisplay";
import { BASE_URL_SOCKET } from "../constants";

const apiCaller = new ApiCaller();

const ViewList = () => {
    const { id } = useParams();
    const { loginDetails } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [uList, setList] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await apiCaller.sendGet(`list/${id}`, loginDetails);
                setList(data);
            } catch (error) {
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchList();

        const socket = new SockJS(BASE_URL_SOCKET);
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe(`/topic/list/${id}`, (message) => {
                    const updatedList = JSON.parse(message.body);
                    setList(updatedList);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            if (client && client.connected) {
                client.deactivate();
            }
        };
    }, [id, loginDetails]);

    const updateList = (newList) => {

        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/list/${id}`,
                body: JSON.stringify(newList)
            });
            console.log("Sent update to WebSocket");
        }
    };

    return (
        <>
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
                        <ListDisplay uList={uList} updateList={updateList} />
                    )}
                </>
            )}
        </>
    );
};

export default ViewList;
