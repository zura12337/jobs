import http from './httpService';

const apiEndpoint = '/api/users';

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        img: user.img,
        password: user.password,
        name: user.name
    })
}

export default {
    register
}