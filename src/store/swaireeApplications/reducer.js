import {
    GET_SWAIREE_APPLICATIONS_FAIL,
    GET_SWAIREE_APPLICATIONS_SUCCESS,
    GET_SWAIREE_APPLICATION_DETAIL_SUCCESS,
    GET_SWAIREE_APPLICATION_DETAIL_FAIL,
} from "./actionTypes"

const INIT_STATE = {
    applications: [],
    applicationDetail: {},
    error: {},
}

const SwaireeApplications = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SWAIREE_APPLICATIONS_SUCCESS:
            return {
                ...state,
                applications: action.payload,
            }

        case GET_SWAIREE_APPLICATIONS_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_SWAIREE_APPLICATION_DETAIL_SUCCESS:
            return {
                ...state,
                invoiceDetail: action.payload,
            }

        case GET_SWAIREE_APPLICATION_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state
    }
}

export default SwaireeApplications
