import axios from 'axios';
import store from '../Store/Store';
const Instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
});

// Request interceptor
// Add a request interceptor
Instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Instance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default Instance;