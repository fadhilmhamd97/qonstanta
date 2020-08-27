import axios from "axios";

const BASE_API = 'https://apiapps.qonstanta.com/auth'

const TRYOUT_API = 'https://apiapps.qonstanta.com/tryout'
const MASTER_API = 'https://apiapps.qonstanta.com/learning' 

const createApiRequest = (url, requestUrl) => {
    return axios.create({
        url: `${url} + ${requestUrl.split(' ')[1]}`,
        method: requestUrl.split(' ')[0],
        transformResponse: [res => {
            console.log(res)
        }]
    })
}

export {BASE_API, TRYOUT_API, MASTER_API,createApiRequest}