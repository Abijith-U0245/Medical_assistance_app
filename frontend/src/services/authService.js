// src/services/authService.js
import axios from 'axios';

export const loginUser = async(credentials) => {
    try {
        const response = await axios.post('/api/auth/login', credentials);
        return response;
    } catch (error) {
        throw error;
    }
};