import { takeEvery, put } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { loginSuccess, apiError } from "./actions"
import { BASE_URL } from "helpers/api_helper";

const qs = require('qs');

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "default") {
      (async () => {

        const params = qs.stringify({
          grant_type: 'password',
          username: user.email,
          password: user.password
        })
    
        let response = await new Promise(resolve => {
           var xhr = new XMLHttpRequest();
           xhr.open("POST", BASE_URL + '/oauth/token', true);
           xhr.setRequestHeader('Authorization', 'Basic Y3JlZGl0X2NhcmRfd2ViOjEyMzQ1Ng==')
           xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
           xhr.onload = function(e) {
             resolve({data: JSON.parse(xhr.response), status: xhr.status});
           };
           xhr.onerror = function () {
             resolve({data: JSON.parse(xhr.response), status: xhr.status});
             console.error("** An error occurred during the XMLHttpRequest");
           };
           xhr.send(params);
        }) 
    
        if (response.status === 200) {
          const res = {
            uid: 1,
            username: user.email,
            role: "admin",
            email: user.email,
          }
          localStorage.setItem("authUser", JSON.stringify(response.data));
          localStorage.setItem("authInformation", JSON.stringify(res));
          put(loginSuccess(res));
          history.push("/applications")
        } else {
          throw response.data;
        }
     })()

    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("authInformation")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      /* const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response)) */
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
