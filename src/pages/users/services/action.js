import axios from 'axios';
import {
    FETCH_RANDOM_USERS,
    SET_LOADING_USERS, SET_FULL_URL
} from './constants';


import {API_ROOT} from '../../../helpers/constants';

export const getRandomUsers = () => async (dispatch, getState) => {
    dispatch({type: SET_LOADING_USERS, payload: true});

    const users = await axios.get(`${API_ROOT}/?results=15`)

    dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
};

export const filterUsers = (fullUrl, urlNationality) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING_USERS, payload: true});

    if (fullUrl !== '') {
        const users = await axios.get(`${API_ROOT}/${fullUrl}`)

        dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
    } else {
        const users = await axios.get(`${API_ROOT}/?results=15`)

        dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
    }
};

export const setFullUrl = (url) => async (dispatch, getState) => {

    dispatch({type: SET_FULL_URL, payload: url});
};



