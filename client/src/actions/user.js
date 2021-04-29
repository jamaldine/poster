import axios from "axios";

import { BASE_API } from '../utils/config';

export function login(data) {
  const request = axios
    .post(`${BASE_API}/login`, data, { withCredentials: true })
    .then((response) => response.data);
  return {
    type: "LOGIN",
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${BASE_API}/auth`, { withCredentials: true })
    .then((response) => response.data);
  return {
    type: "AUTH",
    payload: request,
  };
}

export function register(data) {
  const request = axios
    .post(`${BASE_API}/register`, data)
    .then((response) => response.data);
  return {
    type: "REGISTER",
    payload: request,
  };
}

export function logout() {
  const request = axios
    .get(`${BASE_API}/logout`, { withCredentials: true })
    .then((response) => response.data);
  return {
    type: "LOGOUT",
    payload: request,
  };
}

export function users() {
  const request = axios
    .get(`${BASE_API}/users`, { withCredentials: true })
    .then((response) => response.data);
  return {
    type: "ALL_USERS",
    payload: request,
  };
}

export function updateProfil(data){


  const request = axios({
    method: "post",
    url: `${BASE_API}/update_profil`,
    data: data,
    headers: { "Content-Type": "multipart/form-data", withCredentials: true }
  })
    .then((response) => response.data)
    .catch((response) => console.log(response));

    return {
      type: "UPDATE_PROFIL",
      payload: request,
    };
}