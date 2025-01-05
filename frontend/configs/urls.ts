export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL_AUTH}/login`;
export const REGISTER_URL = `${process.env.NEXT_PUBLIC_API_URL_AUTH}/register`;
export const GET_COOKIE = `${process.env.NEXT_PUBLIC_API_URL_AUTH}/sanctum/csrf-cookie`;
export const VALIDATE_COOKIE = `${process.env.NEXT_PUBLIC_API_URL}/me`;