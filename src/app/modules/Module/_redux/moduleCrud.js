import axios from "axios";

const _host = 'https://api.qonstanta.com/api/v1';

export const MODULE_LIST = `${_host}/web/tryoutPacket`;

export const REGISTER_MODULE = `${_host}/web/order/tryoutPacket`

export function getModules() {
    return axios.get(MODULE_LIST)
}

export function registerModules(schoolName, provinsiId, provinsiName, kabupatenId, kabupatenName, tryoutScheduleCode) {
    return axios.post(REGISTER_MODULE, {schoolName, provinsiId, provinsiName, kabupatenId, kabupatenName, tryoutScheduleCode})
}