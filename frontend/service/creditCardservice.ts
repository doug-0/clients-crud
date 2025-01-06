import { API_URL } from '@/configs/urls';
import { CreditCard, EditCreditCard } from '@/types/CreditCard';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const endpoint = `${API_URL}/credit-card`

const bearer_token = localStorage.getItem('token');

export const getCreditCard = async (id: number) => {
  const response = await axios.get(`${endpoint}/${id}` , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}

export const createCreditCard = async (data: CreditCard) => {
  const response = await axios.post(endpoint, { ...data },{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}

export const updateCreditCard = async (data: EditCreditCard) => {

  const response = await axios.put(`${endpoint}/${data.id}`, { ...data },{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}
