import axios from 'axios';

import {API_ROOT} from '../../../helpers/constants';

export const fetchUsers = async (params) => {

    if (Object.keys(params).length !== 0) {
        const users = await axios.get(`${API_ROOT}`, {params})
        return users.data
    } else {
        const users = await axios.get(`${API_ROOT}`, {params: {results: 15}});
        return users.data
    }
};




