import axios from 'axios';

import {API_ROOT} from '../helpers/constants';

export const fetchUsers = async (defaultParams = {}) => {

  const params = {
    results: 15,
    ...defaultParams,
  }

  const users = await axios.get(`${API_ROOT}/`, {params})
      .then((res) => ({
        error: null,
        data: res.data,
      }))
      .catch((error) => ({
        error: error.message,
        data: null,
      }))
  return users
};