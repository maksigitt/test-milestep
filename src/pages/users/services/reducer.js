import {
    FETCH_RANDOM_USERS,
    SET_GENDER_URLS,
    SET_NAT_URLS,
    SET_LOADING_USERS
} from './constants';

const initialState = {
    isLoading: false,
    users: [],
    genderUrl: '',
    natUrl: []
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
        case SET_GENDER_URLS: {
            return {
                ...state,
                genderUrl: action.payload
            };
        }
        case SET_NAT_URLS: {
            return {
                ...state,
                natUrl: action.payload
            };
        }
        default:
            return state;
    }
};

