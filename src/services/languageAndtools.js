import http from './httpService';


const lanEndpoint = '/api/languages';
const toolEnpoint = '/api/tools'


export function getTools() {
    return http.get(toolEnpoint);
}



export function getLanguages() {
    return http.get(lanEndpoint);
}