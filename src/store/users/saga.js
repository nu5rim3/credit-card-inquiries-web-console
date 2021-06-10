import { get, post, getToken, getLoggedUser } from "helpers/api_helper"
import { INT_GET_USERS, INT_CREATE_USER, INT_GET_USER_BY_ID, INT_UPDATE_USER } from "helpers/url_helper";

export async function getAllEntries() {
  return await get(INT_GET_USERS, {
    params: {
      page: '0',
      size: '100000',
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  })
  .then((response) => {
    return (response.data.content);
  })
  .catch((error) =>{
    console.log(error);
  })
}

export async function createUser(data) {
  return await post(INT_CREATE_USER, data, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function getuserById(data) {
  return await get(`${INT_GET_USER_BY_ID}/${data.meo_id}`, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function updateUser(data) {
  return await post(INT_UPDATE_USER, data, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}