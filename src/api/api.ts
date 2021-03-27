import { API_BASE_URL } from '../constants';
import axios, { AxiosRequestConfig } from 'axios';
import { Auth } from 'aws-amplify';

export const fetchPosts = () => {
    return axios.get(`${API_BASE_URL}/posts`)
    .then(response => response.data)
    .catch(error => error.data);
}

export const createPost = (content: any) => {
    return axios.post(`${API_BASE_URL}/posts`, content)
    .then(response => response.data)
    .catch(error => error.data);
}

export const fetchCategories = () => {
    return axios.get(`${API_BASE_URL}/posts/categories`)
    .then(response => response.data)
    .catch(error => error.data);
}

export const createCategory = (content: any) => {
    return axios.post(`${API_BASE_URL}/posts/categories`, content)
    .then(response => response.data)
    .catch(error => error.data);
}

axios.interceptors.request.use((request: AxiosRequestConfig) => {
    if (request.url && !request.url.includes(API_BASE_URL)) {
        return request;
    }

    return Auth.currentSession()
    .then(data => {
        request.headers.Authorization = `Bearer ${data.getIdToken().getJwtToken()}`;
        return request;
    })
    .catch(error => {
        console.log(error);
        return request;
    })
})