import {
    FETCH_RANDOM_USERS,
    SET_LOADING_USERS,
    SET_FULL_URL
} from './constants';

const initialState = {
    isLoading: false,
    users: [],
    fullUrl: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_USERS: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case FETCH_RANDOM_USERS: {
            return {
                ...state,
                users: action.payload,
                isLoading: false
            };
        }
        case SET_FULL_URL: {
            return {
                ...state,
                fullUrl: action.payload
            };
        }
        default:
            return state;
    }
};

