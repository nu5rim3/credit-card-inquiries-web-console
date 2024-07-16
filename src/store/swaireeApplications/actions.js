import {
  GET_SWAIREE_APPLICATIONS,
  GET_SWAIREE_APPLICATION_DETAIL
} from "./actionTypes"

export const getSwaireeApplications = () => ({
  type: GET_SWAIREE_APPLICATIONS,
})

export const getSwaireeApplicationDetail = applicationId => ({
  type: GET_SWAIREE_APPLICATION_DETAIL,
  applicationId,
})

