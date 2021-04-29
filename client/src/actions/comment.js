import axios from "axios";
import { BASE_API } from "../utils/config";


export function addComment(data) {

    const request = axios({
      method: "post",
      url: `${BASE_API}/comment`,
      data: data,
      headers: { withCredentials: true }
    })
      .then((response) => response.data)
      .catch((response) => console.log(response));
  
    return {
      type: "ADD_COMMENT",
      payload: request,
    };
  }
  