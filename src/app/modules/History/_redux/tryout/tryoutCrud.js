import axios from "axios";

const _host = 'https://api.qonstanta.com/api/v1';

const TRYOUT_HISTORY = 'web/order/tryoutPacket/history'

const getTryoutHistory = () => {
    return axios.get(`${_host}/${TRYOUT_HISTORY}`)
}

export { getTryoutHistory }