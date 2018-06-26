import axios from 'axios';

export const HTTP = axios.create({
    baseURL: window.autoProcessConfiguration.apiUrl,
    withCredentials: true,
    xsrfHeaderName: "x-csrf-token",
});

HTTP.interceptors.response.use((response) => {
    const token = response.headers["x-csrf-token"];
    debugger
    if (token) {
        HTTP.defaults.headers.common['x-csrf-token'] = token;
    }
    return response;
});
