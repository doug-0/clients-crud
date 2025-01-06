import { FormLogin } from '@/types/FormLogin.type'
import axios from 'axios'
import { GET_COOKIE, LOGIN_URL, REGISTER_URL, VALIDATE_COOKIE } from '@/configs/urls'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


export const getCookie = async () => {
  await axios.get(GET_COOKIE, {
    withCredentials: true,
  });
}

export const loginUser = async (formLogin: FormLogin) => {
  await getCookie();

  const response = await axios.post(LOGIN_URL, formLogin, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return response.data;
}

export const validateToken = async (token: string | null) => {
  await getCookie();

  const response = await axios.get(VALIDATE_COOKIE, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data
}

type signUpForm = {
  name: string
} & FormLogin

export const signUpUser = async (formSignup: signUpForm) => {
  await getCookie();

  const response = await axios.post(REGISTER_URL, formSignup, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return response.data;
}

export const logOutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}