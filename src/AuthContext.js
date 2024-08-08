import React, { createContext, useState, useEffect } from 'react';
import {BASE_URL} from "./constants";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const baseurl = BASE_URL
    const [user, setUser] = useState(null);
    const [loginDetails, setLogin] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedLogin = localStorage.getItem('loginDetails');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedLogin) {
            setLogin(storedLogin)
        }
    }, []);

    const login = async (username, password) => {
        const response = await fetch(baseurl + 'user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
        })
        const res = await response.json()

        if (!response.ok) {
            return false
        }
        const userLoginData = btoa(username + ':' + password)
        setLogin(userLoginData)
        const user = res
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginDetails', userLoginData);
        return true;
    };

    const createAccount = async (account) => {
        const response = await fetch(baseurl + 'user/newAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(account)
        })
        const res = await response.json()

        if (!response.ok) {
            return false
        }

        const user = res
        setUser(user)
        const userLoginData = btoa(account.username + ':' + account.password)
        setLogin(userLoginData)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginDetails', userLoginData);
        return true;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('loginDetails');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loginDetails, createAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
