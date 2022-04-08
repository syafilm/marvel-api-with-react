import axios from 'axios'
const API_URL = `${process.env.REACT_APP_MARVEL_API_URL}`;

const base = () => {
  return axios.create({
    baseURL: `${API_URL}/v1/public/`,
  })
}

export default base;
