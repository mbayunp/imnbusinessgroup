import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // ganti dengan URL backend kamu

export const getServices = async () => {
  const response = await axios.get(`${BASE_URL}/services`);
  return response.data;
};
