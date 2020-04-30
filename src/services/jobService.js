import http from './httpService';

const apiEndpoint = '/api/jobs';
function jobUrl(id){
    return `${apiEndpoint}/${id}`
}

export function getJobs() {
    return http.get(apiEndpoint);
}

export function getJob(jobId){
    return http.get(jobUrl(jobId));
}

export function saveJob(job){
    if(job._id){
        const body = {...job};
        delete body._id;
        return http.put(jobUrl(job._id), body)
    }
    return http.post(apiEndpoint, job)
}
export function deleteJob(jobId) {
    return http.delete(jobUrl(jobId));
}

