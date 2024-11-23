import axios from 'axios';


const APP_URI = "https://file-sharing-iaye.onrender.com";
// const APP_URI = "http://localhost:6010"

export const uploadFile = async (data, setUploadProgress) => {
    try {


      const response = await axios.post(`${APP_URI}/upload`, data, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
       
          setUploadProgress(progress); // Update progress in the parent component
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error while calling the API ', error.message);
      setUploadProgress(0); // Reset progress on error
    }
  };