import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE, PROFILE_SUCCESS } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
import { put as putMethod, getToken } from 'helpers/api_helper'
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper"
import { success } from "toastr"

const fireBaseBackend = getFirebaseBackend()

export const updateProfile = async(data) => {
  const params = {
    type: "password",
    temporary: false,
    value: data.password
  }

  return await new Promise(async(resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `/auth/admin/realms/master/users/${data.idx}/reset-password`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${await getToken().then(res => res)}`)
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function (e) {
      if (xhr.status === 204) {
        resolve({data: '', status: xhr.status });  
      } else {
        resolve({data: JSON.parse(xhr.response), status: xhr.status });
      }
      
    };
    xhr.onerror = function () {
      resolve({status: xhr.status });
      console.error("** An error occurred during the XMLHttpRequest");
    };
    xhr.send(JSON.stringify(params));
  })

}

function* editProfile({ payload: { user, props } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "default") {

      (async () => {
        
        // put(profileSuccess(response))
        // props.profileSuccess(PROFILE_SUCCESS, '')
      })()
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeProfile, {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    }
  } catch (error) {
    yield put(profileError(error))
  }
}

function* ProfileSaga() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

export default ProfileSaga
