import React, { createContext, useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [list, setList] = useState(null);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
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
    }, []);

    const updateList = (newList) => {
        setList(newList);

        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/list/${newList.listInfo.id}`,
                body: JSON.stringify(newList),
            });
        }
    };

    return (
        <ListContext.Provider value={{ list, updateList }}>
            {children}
        </ListContext.Provider>
    );
};
