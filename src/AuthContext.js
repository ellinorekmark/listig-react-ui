import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const baseurl = "http://localhost:8080/api/";
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
        localStorage.setItem('userLogin', userLoginData);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loginDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
