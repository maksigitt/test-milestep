import axios from 'axios';
import {
    FETCH_RANDOM_USERS,
    SET_GENDER_URLS,
    SET_NAT_URLS,
    SET_LOADING_USERS
} from './constants';


import {API_ROOT} from '../../../helpers/constants';

export const getRandomUsers = () => async (dispatch, getState) => {
    dispatch({type: SET_LOADING_USERS, payload: true});

    const users = await axios.get(`${API_ROOT}/?results=15`)

    dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
};

export const filterUsers = (urlGender, urlNationality) => async (dispatch, getState) => {
    dispatch({type: SET_LOADING_USERS, payload: true});

    if(urlGender === '' && urlNationality === '') {
        const users = await axios.get(`${API_ROOT}/?results=15`)
        dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
    }else  if(urlGender.includes('all') && urlNationality === '') {
        const users = await axios.get(`${API_ROOT}/?results=15`)
        dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
    } else {
        const users = await axios.get(`${API_ROOT}/?` + (`${urlGender.includes('all') ? '' : urlGender}`) + (urlNationality !== '' ? '&' + urlNationality : ''))
        dispatch({type: FETCH_RANDOM_USERS, payload: users.data});
    }
};

export const setGenderUrl = (url) => async (dispatch, getState) => {

    dispatch({type: SET_GENDER_URLS, payload: url});
};

export const setNatUrl = (url) => async (dispatch, getState) => {

    dispatch({type: SET_NAT_URLS, payload: url});
};



