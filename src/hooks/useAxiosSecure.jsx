import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, err => {
            console.log('err caught by interceptors', err);

            if (err.status === 401 || err.status === 403) {
                console.log('need to logout the user');
                signOutUser()
                    .then(() => {
                        console.log('logged out with axios interceptors');
                        navigate('/signIn')
                    })
                    .catch(error => console.log(error))
            }
            return Promise.reject(err);
        });
    }, []);

    return axiosInstance
};

export default useAxiosSecure;