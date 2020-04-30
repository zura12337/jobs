import http from './httpService';
import jwtDecode from 'jwt-decode';
const tokenKey = 'token';
const apiEndpoint = '/api/auth';

http.setJwt(getJwt())

export async function login(email, password){
    try{
        const { data: jwt } = await http.post(apiEndpoint, { email, password });
        localStorage.setItem(tokenKey, jwt);
    }
    catch(ex){
        if(ex.response && ex.response.status === 400){
            return (ex.response.data);
        }
    }
}

export function loginWithJwt(jwt){
    window.localStorage.setItem(tokenKey, jwt)
}

export function logout(){
    window.localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try{
        const jwt = window.localStorage.getItem(tokenKey);
        return jwtDecode(jwt)
    }
    catch(ex){
        return null;
    }
}

export async function editProfile(user){
    const { data } = await http.put(apiEndpoint+'/edit', { 
        name: user.name,
        email: user.email,
        password: user.password
    })
    logout();
    login(user.email, user.password);
    return data;
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    editProfile,
    getJwt
}