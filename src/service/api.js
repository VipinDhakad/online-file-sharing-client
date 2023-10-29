import axios from 'axios';


const APP_URI = "https://file-sharing-iaye.onrender.com";

export const uploadFile = async (data) => {
    // data= name, file
    try {
        const response = await axios.post(`${APP_URI}/upload`, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}