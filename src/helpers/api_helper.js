import axios from "axios"
import jwt_decode from "jwt-decode";
const qs = require('qs');
// get local storage object
const localAuth = localStorage.getItem("authUser");

//apply base url for axios
const API_URL = "/services"

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
  var refreshToken = (localAuth !== null && localAuth !== '') ? localAuth.refresh_token : null;
  var decode = jwt_decode(localAuth.access_token);

  if (decode.exp <= Math.round(new Date().getTime() / 1000)) {
    
    const params = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })

    let response = await new Promise(resolve => {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/services/auth/realms/master/protocol/openid-connect/token', true);
      xhr.setRequestHeader('Authorization', 'Basic YWRtaW4tY29uc29sZToyNTBiNWIzZi04NWUwLTQzNjYtYTYxNS04ZTAzZjBjOTdjMzc=')
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = function (e) {
        resolve({ data: JSON.parse(xhr.response), status: xhr.status });
      };
      xhr.onerror = function () {
        resolve({ data: JSON.parse(xhr.response), status: xhr.status });
        console.error("** An error occurred during the XMLHttpRequest");
      };
      xhr.send(params);
    })

    if (response.status === 200) {
      var decoded = jwt_decode(response.data.access_token);
      const res = {
        uid: decoded.sub,
        username: decoded.name,
        role: "admin",
        email: decoded.preferred_username,
      }
      localStorage.setItem("authUser", JSON.stringify(response.data));
      localStorage.setItem("authInformation", JSON.stringify(res));
    }
  } else {
    return token;
  }
}

export async function getLoggedUser() { 
  var info = localStorage.getItem("authInformation")

  if (info !== null) {
    return JSON.parse(info).username;
  }
}