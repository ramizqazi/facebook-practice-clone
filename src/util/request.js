import axios from 'axios';
import firebase from 'firebase/app';

/**
 * Request Wrapper with default success/error actions
 */
const request = async (options) => {
  const token = await firebase.auth().currentUser.getIdToken();

  const client = axios.create({
    baseURL: 'https://us-central1-mango-3d538.cloudfunctions.net/api',
    // baseURL: 'http://localhost:5001/mango-3d538/us-central1/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onSuccess = (response) => response.data;

  const onError = (error) => {
    // console.debug('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.debug('Status:', error.response.status);
      // console.debug('Data:', error.response.data);
      // console.debug('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      // console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response ? error.response.data : error);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
