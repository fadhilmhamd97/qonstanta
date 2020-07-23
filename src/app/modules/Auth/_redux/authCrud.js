import axios from "axios";

const _host = 'https://api.qonstanta.com/api/v1';

export const LOGIN_URL = `${_host}/auth/signIn`;
export const REGISTER_URL = `${_host}/auth/signUp`;
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const CHANGE_PASSWORD = `${_host}/auth/resetPassword`
export const FORGOT_PASSWORD = `${_host}/auth/forgotPassword`

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function changePassword(password){
  return axios.get(`${CHANGE_PASSWORD}/${password}`)
}

export function forgotPassword(email) {
  return axios.post(FORGOT_PASSWORD, {email});
}

export function register(email, fullName, nickName, phoneNumber, password) {
  return axios.post(REGISTER_URL, { email, fullName, nickName, phoneNumber,password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
