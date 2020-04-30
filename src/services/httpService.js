import axios from 'axios';

axios.defaults.baseURL = 'https://static-job-listing-api.herokuapp.com/'


function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt
}
  
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}