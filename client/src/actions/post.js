import axios from "axios";
import { BASE_API } from "../utils/config";

export async function allPosts() {
  const request = await axios
    .get(`${BASE_API}/posts?order=-1`, { withCredentials: true })
    .then((response) => response.data);

  return {
    type: "ALL_POSTS",
    payload: request,
  };
}

export async function getUser(id) {
  const request = await axios
    .get(`${BASE_API}/getUser?id=${id}`, {
      withCredentials: true,
    })
    .then((response) => response.data);
  return {
    type: "GET_USER",
    payload: request,
  };
}

export async function userPosts(id) {
  const request = await axios
    .get(`${BASE_API}/userPosts?order=-1&id=${id}`, {
      withCredentials: true,
    })
    .then((response) => response.data);
  return {
    type: "USER_POSTS",
    payload: request,
  };
}

export function addPost(data) {

  const request = axios({
    method: "post",
    url: `${BASE_API}/post`,
    data: data,
    headers: { "Content-Type": "multipart/form-data", withCredentials: true }
  })
    .then((response) => response.data)
    .catch((response) => console.log(response));

  return {
    type: "ADD_POST",
    payload: request,
  };
}

export async function getPost(id) {
  const request = await axios
    .get(`${BASE_API}/getPost?${id}`, {
      withCredentials: true,
    })
    .then((response) => response.data);
  return {
    type: "GET_POST",
    payload: request,
  };
}