import { post, getToken, getLoggedUser } from "helpers/api_helper"
import { SEND_INVITATION } from "helpers/url_helper";

export async function sendInvitaion(data) {
  return await post(SEND_INVITATION, data, {
    params: {
      loggedUser: `${await getLoggedUser().then(res => res)}`
    },
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => res)
}