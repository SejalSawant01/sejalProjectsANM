import axios from 'axios';

axios.interceptors.request.use(
    function (config) {
        config.baseURL = 'https://corpoyageapi.ontratech.com/';
        const login = window.sessionStorage.getItem('login');
        if (login && login === 'true') {
            const token = window.sessionStorage.getItem('token');
                config.headers['Authorization'] = 'Bearer ' + token;        
            }  
             config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)



export default axios;