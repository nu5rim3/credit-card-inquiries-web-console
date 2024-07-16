import { get, getToken, getLoggedUser } from "helpers/api_helper";
import {
  GET_COMMON_APPLICATIONS,
  GET_COMMON_CSV_FILE,
} from "helpers/url_helper";
import FileDownload from "js-file-download";

export async function getAllEntries(from, to, page, size) {
  return await get(GET_COMMON_APPLICATIONS, {
    params: {
      fromDate: from,
      toDate: to,
      page: page,
      size: size,
      loggedUser: `${await getLoggedUser().then((res) => res)}`,
    },
    headers: {
      Authorization: `Bearer ${await getToken().then((res) => res)}`,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}

export async function getCsvFileByRefNo(refNo) {
  return await get(`${GET_COMMON_CSV_FILE}/${refNo}`, {
    params: {
      loggedUser: `${await getLoggedUser().then((res) => res)}`,
    },
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${await getToken().then((res) => res)}`,
    },
  })
    .then((response) => {
      FileDownload(response, `${refNo}.csv`);
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getCsvAllData(from, to) {
  return await get(`${GET_COMMON_CSV_FILE}`, {
    params: {
      fromDate: from,
      toDate: to,
      page: "0",
      size: "100000",
      loggedUser: `${await getLoggedUser().then((res) => res)}`,
    },
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${await getToken().then((res) => res)}`,
    },
  })
    .then((response) => {
      FileDownload(response, `export_all_records.csv`);
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}
