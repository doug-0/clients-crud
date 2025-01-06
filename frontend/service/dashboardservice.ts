import { API_URL } from '@/configs/urls';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const endpoint = `${API_URL}/dashboard`

const bearer_token = localStorage.getItem('token');

export const getDashboardData = async () => {
  const response = await axios.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}