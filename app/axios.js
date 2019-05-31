import axios from 'axios';

export default axios.create({
    baseURL: process.env.API_URL || 'http://192.168.0.4:4500'
});

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorixation'];
    }
}

    
