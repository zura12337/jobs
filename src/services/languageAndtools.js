import http from './httpService';


const lanEndpoint = '/languages';
const toolEnpoint = '/tools'


export function getTools() {
    return http.get(toolEnpoint);
}



export function getLanguages() {
    return http.get(lanEndpoint);
}