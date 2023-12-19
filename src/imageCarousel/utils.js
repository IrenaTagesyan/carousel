import axios from "axios";

export const getImages = () => {
  try {
    const response = axios.get(`https://jsonplaceholder.typicode.com/photos`);

    return response;
  } catch (error) {
    return error;
  }
};
