import axios from "axios";

const _host = 'https://api.qonstanta.com/api/v1';

export const GET_PROVINCE = `${_host}/helper/location/provinsi`;
export const GET_CITY = `${_host}/helper/location/kabupaten`;


export function getProvince() {
    return axios.get(GET_PROVINCE);
}

export function getCity(provinceId){
    return axios.get(`${GET_CITY}/${provinceId}`)
}