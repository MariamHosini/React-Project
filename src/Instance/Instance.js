import axios from 'axios';
import store from '../store/store';
import { stopSpinner, startSpinner } from '../store/spinnerSlice';
const Instance = axios.create({
  baseURL: 'https://makeup-api.herokuapp.com/api/v1',
});

// Request interceptor
// Add a request interceptor
Instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch(startSpinner());
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Instance.interceptors.response.use(function onFulfilled(response) {
  store.dispatch(stopSpinner());
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default Instance;