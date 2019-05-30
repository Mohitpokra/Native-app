import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.28:4500'
});

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorixation'];
    }
}

    
