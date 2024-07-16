import { get, post, getToken, getLoggedUser } from "helpers/api_helper"
import { INT_GET_SHOPS, INT_CREATE_SHOP, INT_GET_SHOP_BY_ID, INT_UPDATE_SHOP,GET_SHOP_QR_CODE } from "helpers/url_helper";
import FileDownload from "js-file-download";
export async function getAllShops(page, size) {
  return await get(INT_GET_SHOPS, {
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

export async function createShop(data) {
  return await post(INT_CREATE_SHOP, data, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function getShopById(data) {
  return await get(`${INT_GET_SHOP_BY_ID}/${data.shopCode}`, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}

export async function updateShop(data) {
  return await post(INT_UPDATE_SHOP, data, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}


export async function getShopQRByCode(code) {
  return await get(`${GET_SHOP_QR_CODE}/${code}`, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    responseType: 'blob',
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }) .then((response) => {
    FileDownload(response, `${code}.png`);
    return true;
  })
  .catch((error) => {
    console.log(error);
  })
}
 