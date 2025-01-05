import { FormLogin } from '@/types/FormLogin.type'
import axios from 'axios'
import { GET_COOKIE, LOGIN_URL } from '@/configs/urls'

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
