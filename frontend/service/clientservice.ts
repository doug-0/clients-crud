import { API_URL } from '@/configs/urls';
import { newClient } from '@/types/ClientsType';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const endpoint = `${API_URL}/clients`

const bearer_token = localStorage.getItem('token');

export const getAllClients = async () => {
  const response = await axios.get(endpoint , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}

export const getClient = async (id: number) => {
  const response = await axios.get(`${endpoint}/${id}` , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}

export const createClient = async (data: newClient) => {
  const response = await axios.post(endpoint, { ...data },{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}

type editClient = {
  second_name: string,
  birth_day: Date | null,
  id: number
} & newClient

export const updateClient = async (data: editClient) => {

  const response = await axios.put(`${endpoint}/${data.id}`, { ...data },{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}

export const deletClient = async (id: number) => {
  const response = await axios.delete(`${endpoint}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer_token}`,
    },
    withCredentials: true,
  });

  return response.data;
}
