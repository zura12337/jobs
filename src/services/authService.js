import http from './httpService';
import jwtDecode from 'jwt-decode';
const tokenKey = 'token';
const apiEndpoint = '/auth';

http.setJwt(getJwt())

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt)
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

export async function getUser(){
    try{
        const { data } = await http.get('users/me');
        return data;
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
    getUser,
    getJwt
}