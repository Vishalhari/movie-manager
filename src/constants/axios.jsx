import axios from "axios";

import { base_url } from "./constants";

let isRefreshing = false;
let refreshSubscribers = [];

const instance = axios.create({
    baseURL:base_url
})

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRrefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
};

instance.interceptors.response.use(
    response => response,
    async error => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401 && !isRefreshing) {
            isRefreshing = true;

            try {
                const response = await axios.post(`${base_url}/auth/refresh/`, {
                    refresh: localStorage.getItem('refresh_token')
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const newToken = response.data.access;
                    localStorage.setItem('access_token', newToken);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    isRefreshing = false;
                    onRrefreshed(newToken);

                    return instance(originalRequest);
                }
            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                // Optionally, redirect to login page
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        if (status === 401 && isRefreshing) {
            return new Promise((resolve) => {
                subscribeTokenRefresh(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    resolve(axios(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);



instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token')
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error =>{
        return Promise.reject(error)
    } 
)

export default instance