import { get } from "helpers/api_helper"
import { GET_APPLICATIONS, GET_CSV_FILE } from "helpers/url_helper";
import FileDownload from "js-file-download";

export async function getAllEntries(from, to) {
  return await get(GET_APPLICATIONS, {
    params: {
      fromDate: from,
      toDate: to,
      page: '0',
      size: '100000',
      loggedUser: 'admin'
    }
  })
  .then((response) => {
    return (response.data.content);
  })
  .catch((error) =>{
    console.log(error);
  })
}

export async function getCsvFileByRefNo(refNo) {
  return await get(`${GET_CSV_FILE}/${refNo}`, {
    params: {
      loggedUser: 'admin'
    },
    responseType: 'blob'
  })
  .then((response) => {
    FileDownload(response, `${refNo}.csv`);
    return true;
  })
  .catch((error) =>{
    console.log(error);
  })
}

export async function getCsvAllData(from, to) {
  return await get(`${GET_CSV_FILE}`, {
    params: {
      fromDate: from,
      toDate: to,
      page: '0',
      size: '100000',
      loggedUser: 'admin'
    },
    responseType: 'blob'
  })
  .then((response) => {
    FileDownload(response, `export_all_records.csv`);
    return true;
  })
  .catch((error) =>{
    console.log(error);
  })
}