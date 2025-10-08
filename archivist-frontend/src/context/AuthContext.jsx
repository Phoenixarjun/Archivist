import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode'; // You might need to install this: npm install jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        let userPayload = null;
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userPayload = {
                    email: decodedToken.sub,
                    role: decodedToken.role,
                    name: decodedToken.name
                };
                setUser(userPayload);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
        return userPayload;
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = async (credentials) => {
        const response = await apiService.login(credentials);
        if (response.token) {
            localStorage.setItem('token', response.token);
            return await fetchUser();
        } else {
            throw new Error("Login failed: No token received");
        }
    };

    const register = async (userData) => {
        return await apiService.register(userData);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    const value = { user, isAuthenticated, login, register, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
