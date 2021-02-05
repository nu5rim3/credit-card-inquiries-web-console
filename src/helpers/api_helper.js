import axios from "axios"

// get local storage object
const localAuth = localStorage.getItem("authUser");

//pass new generated access token here
// const token = accessToken

//apply base url for axios
// const API_URL = "/services"
const API_URL = "/credit-card-inquiries-service"

const axiosApi = axios.create({
  baseURL: API_URL,
})

// axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export const BASE_URL = API_URL;

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

export async function getToken() {
  // get local storage object
  const localAuth = JSON.parse(localStorage.getItem("authUser"));
  var token = (localAuth !== null && localAuth !== '') ? localAuth.access_token : null;

  if (localAuth.expires_in === 0) {
    // post('')
  } else {
    return token;
  }
}