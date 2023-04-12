import axios from 'axios';
import { store } from '@/components/redux/store';
import { logout } from '@/components/redux/userSlice';

const api = axios.create({
    baseURL: 'https://dev.codeleap.co.uk/'
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            return store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;