import http from './httpService';

const apiEndpoint = '/users';

function register(user) {

    return http.post(apiEndpoint, {
        email: user.username,
        image: user.image,
        password: user.password,
        name: user.name
    })
}

export default {
    register
}