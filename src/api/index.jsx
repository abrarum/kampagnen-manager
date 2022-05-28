import axios from 'axios';
// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config({ path: path.resolve(__dirname, '.env') });

// const SERVER_PORT = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;
// const ELASTIC_URL = `${process.env.REACT_APP_ELASTIC_URL}/api`;

const api = axios.create({
    // baseURL: ELASTIC_URL || SERVER_PORT,
    baseURL: 'http://localhost:5000/api/'
});

export const fetchKampagnen = () => api.get(`/kampagnen`);
export const insertKampagnen = (payload) => api.post(`/create`, payload);
export const reset = () => api.post(`/reset`);

const apis = {
    fetchKampagnen,
    insertKampagnen,
    reset,
};

export default apis;
