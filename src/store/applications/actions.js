import {
  GET_APPLICATIONS,
  GET_APPLICATION_DETAIL
} from "./actionTypes"

export const getApplications = () => ({
  type: GET_APPLICATIONS,
})

export const getApplicationDetail = applicationId => ({
  type: GET_APPLICATION_DETAIL,
  applicationId,
})

