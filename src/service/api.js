import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const API_URI = process.env.API_URI;
const APP_URI = "http://localhost:8000";
// const APP_URI = process.env.APP_URI;//

export const uploadFile = async (data) => {
    // data= name, file
    try {
        const response = await axios.post(`${APP_URI}/upload`, data);
        console.log("response in api.js is", response)
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}