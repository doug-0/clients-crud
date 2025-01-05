import { API_URL } from '@/configs/urls';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const entpoind = `${API_URL}/clients`

const bearer_token = localStorage.getItem('token');

export const getAllClients = async () => {
  const response = await axios.get(entpoind , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}
