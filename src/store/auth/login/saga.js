import { takeEvery, put } from "redux-saga/effects";
import jwt_decode from "jwt-decode";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { loginSuccess, apiError } from "./actions";
import { BASE_URL } from "helpers/api_helper";

const qs = require("qs");

export async function login(user, history) {
  if (process.env.REACT_APP_DEFAULTAUTH === "default") {
    const params = qs.stringify({
      grant_type: "password",
      username: user.email,
      password: user.password,
    });

    let response = await new Promise((resolve) => {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "/auth/realms/master/protocol/openid-connect/token",
        true
      );
      xhr.setRequestHeader(
        "Authorization",
        `Basic ${process.env.REACT_APP_ACCESS_TOKEN}`
      );
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function (e) {
        resolve({ data: JSON.parse(xhr.response), status: xhr.status });
      };
      xhr.onerror = function () {
        resolve({ data: JSON.parse(xhr.response), status: xhr.status });
        console.error("** An error occurred during the XMLHttpRequest");
      };
      xhr.send(params);
    });

    if (response.status === 200) {
      var decoded = jwt_decode(response.data.access_token);
      const res = {
        uid: decoded.sub,
        username: decoded.name,
        role: "admin",
        email: decoded.preferred_username,
      };
      localStorage.setItem("authUser", JSON.stringify(response.data));
      localStorage.setItem("authInformation", JSON.stringify(res));
      put(loginSuccess(res));
      history.push("/common-applications");
      return response;
    } else {
      return response;
    }
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "default") {
      (async () => {})();
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authInformation");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      /* const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response)) */
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
