import axios from 'axios';

export const login = async (email, password) => {
  console.log(email, password)
  try {
    const response = await axios.post('http://localhost:5000/auth/login',
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
    const response = await axios.post('http://localhost:5000/auth/signup', {fullNmes, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};