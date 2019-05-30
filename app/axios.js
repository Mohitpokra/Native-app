import axios from 'axios';

export default axios.create({
    baseURL: process.env.API_URL
});

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorixation'];
    }
}

    
