import { get, getToken, BASE_URL } from "helpers/api_helper"
import { GET_ALL_DOCUMENTS_BY_REFERENCE, VIEW_IMAGE } from "helpers/url_helper";

export async function getAllDocuments(refNo) {
  return await get(GET_ALL_DOCUMENTS_BY_REFERENCE, {
    params: {
      referenceNo: refNo,
      page: '0',
      size: '100000',
      loggedUser: 'admin'
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

export async function viewImages(path) {
  return await get(`${VIEW_IMAGE}/${path}`, {
    params: {
      loggedUser: 'admin'
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  })
  .then((response) => {
    return response;
  })
  .catch((error) =>{
    console.log(error);
  })
}

export function getImageViewUrl() {
  return `${BASE_URL}${VIEW_IMAGE}`;
}