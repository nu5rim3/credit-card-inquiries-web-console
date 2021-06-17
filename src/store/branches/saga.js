import { get, post, getToken, getLoggedUser } from "helpers/api_helper"
import { INT_GET_BRANCHES, INT_CREATE_BRANCH, INT_GET_BRANCH_BY_ID, INT_UPDATE_BRANCH } from "helpers/url_helper";

export async function getAllEntries(page, size) {
  return await get(INT_GET_BRANCHES, {
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
  .catch((error) =>{
    console.log(error);
  })
}

export async function createBranch(data) {
  return await post(INT_CREATE_BRANCH, data, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function getBranchById(data) {
  return await get(`${INT_GET_BRANCH_BY_ID}/${data.meo_id}`, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function updateBranch(data) {
  return await post(`${INT_UPDATE_BRANCH}`, data, {
    params: {
      code: data.code,
      status: data.branch_status,
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}