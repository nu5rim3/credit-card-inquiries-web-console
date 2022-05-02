import { get, post, getToken, getLoggedUser } from "helpers/api_helper"
import { INT_GET_USERS, INT_CREATE_USER, INT_GET_USER_BY_ID, INT_UPDATE_USER, INT_INFO_USER, GET_USER_QR_CODE } from "helpers/url_helper";
import FileDownload from "js-file-download";
export async function getAllEntries(page, size) {
  return await get(INT_GET_USERS, {
    params: {
      page: page,
      size: size,
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  })
    .then((response) => response)
    .catch((error) => {
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

export async function getuserinfoById(userId) {
  return await get(`${INT_INFO_USER}`, {
    params: {
      userId: userId
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function getUserQRById(code) {
  return await get(`${GET_USER_QR_CODE}/${code}`, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    responseType: 'blob',
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then((response) => {
    FileDownload(response, `${code}.png`);
    return true;
  })
    .catch((error) => {
      console.log(error);
    })
}