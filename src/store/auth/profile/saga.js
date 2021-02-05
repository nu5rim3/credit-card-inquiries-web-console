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
  return putMethod('/api/v1/users/update-password', data, {
    headers: {
      'Authorization': `Bearer ${await getToken().then(res => res)}`
    }
  }).then(res => { return {status: 'success', data: res}})
  .catch(err => { return {status: 'error', data: err}})
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
