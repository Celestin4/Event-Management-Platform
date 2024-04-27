import axios from 'axios';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  console.log(email, password)
  try {
    const response = await axios.post(`${VITE_BACKEND_URL}/auth/login`,
        { email, password },

        {
        headers: {
          'Content-Type': 'application/json'
        }
      }
        );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (fullNmes, email, password) => {
  try {
    const response = await axios.post(`${VITE_BACKEND_URL}/auth/signup`, {fullNmes, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};