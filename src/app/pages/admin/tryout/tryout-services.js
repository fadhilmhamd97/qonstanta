import axios from 'axios'
import * as api from './api'
import { TRYOUT_API, MASTER_API, createApiRequest } from "../../../../app/Configuration"

/* REGION: TRY OUT SCHEDULE */
const getTryoutScheduleList = () => {
    return axios.get(TRYOUT_API + api.API_TRYOUT_SCHEDULE_LIST)
}

const getTryoutScheduleDetailList = () => {
    return axios.get(TRYOUT_API + api.API_TRYOUT_SCHEDULE_DETAIL_LIST)
}

const getTryoutScheduleById = id => {
    return axios.get(`${TRYOUT_API + api.API_TRYOUT_SCHEDULE_GET_DETAIL}/${id}`)
}

const postTryoutScheduleCreate = data => {
    return axios.post(TRYOUT_API + api.API_TRYOUT_SCHEDULE_CREATE, data)
}

const patchTryoutScheduleEdit = (data, id) => {
    return axios.patch(`${TRYOUT_API + api.API_TRYOUT_SCHEDULE_EDIT}/${id}`, data)
}

const deleteTryoutScheduleDelete = id => {
    return axios.delete(`${TRYOUT_API + api.API_TRYOUT_SCHEDULE_EDIT}/${id}`)
}

/* REGION: TRYOUT PACKET */
const getTryoutPacketList = () => {
    return axios.get(TRYOUT_API + api.API_TRYOUT_PACKET)
}

const getTryoutPacketDetailById = id => {
    return axios.get(`${TRYOUT_API + api.API_TRYOUT_PACKET_DETAIL}/${id}`)
}

const postTryoutPacketCreate = data => {
    return axios.post(TRYOUT_API + api.API_TRYOUT_PACKET_STORE, data)
}

const patchTryoutPacketEdit = (data, id) => {
    return axios.patch(`${TRYOUT_API + api.API_TRYOUT_PACKET_EDIT}/${id}`, data)
}

const deleteTryoutPacketDelete = id => {
    return axios.delete(`${TRYOUT_API + api.API_TRYOUT_PACKET_DELETE}/${id}`)
}

/* REGION: TRYOUT PACKET TYPE */
const getTryoutPacketType = () => {
    return axios.get(TRYOUT_API + api.API_TRYOUT_PACKET_TYPE)
}

const postTryoutPacketType = data => {
    return axios.post(TRYOUT_API + api.API_TRYOUT_PACKET_TYPE_STORE, data)
}

const getTryoutPacketTypeById = id => {
    return axios.get(`${TRYOUT_API + api.API_TRYOUT_PACKET_TYPE_DETAIL}/${id}`)
}

const patchTryoutPacketType = (data, id) => {
    return axios.patch(`${TRYOUT_API + api.API_TRYOUT_PACKET_TYPE_EDIT}/${id}`, data)
}

const deleteTryoutPacketType = id => {
    return axios.delete(`${TRYOUT_API + api.API_TRYOUT_PACKET_DELETE}/${id}`)
}

const getScheduleDetailList = () => {
    return axios.get(`${TRYOUT_API}/tryout-schedule-detail`)
}

const getScheduleDetailById = id => {
    return axios.get(`${TRYOUT_API}/tryout-schedule-detail/${id}`)
}

const postScheduleDetail = data => {
    return axios.post(`${TRYOUT_API}/tryout-schedule-detail`, data)
}

const patchScheduleDetail = ({name, datetimeCheckin, datetimeStart, datetimeEnd, tryoutScheduleId, questionPacketId}, id) => {
    return axios.patch(`${TRYOUT_API}/tryout-schedule-detail/${id}`, {name, datetimeCheckin, datetimeStart, datetimeEnd, tryoutScheduleId, questionPacketId})
}

const deleteScheduleDetail = id => {
    return axios.delete(`${TRYOUT_API}/tryout-schedule-detail/${id}`)
}

/* COMMON */
const getQuestionPacketList = () => {
    return axios.get(`${MASTER_API}/question-packet`)
}

export { 
            getTryoutScheduleList, 
            getTryoutScheduleDetailList,postTryoutScheduleCreate, 
            getTryoutScheduleById, 
            patchTryoutScheduleEdit, 
            deleteTryoutScheduleDelete,
            getTryoutPacketList,
            getTryoutPacketDetailById,
            postTryoutPacketCreate,
            patchTryoutPacketEdit,
            deleteTryoutPacketDelete,
            getTryoutPacketType,
            postTryoutPacketType,
            getTryoutPacketTypeById,
            patchTryoutPacketType,
            deleteTryoutPacketType,
            getScheduleDetailList,
            getScheduleDetailById,
            postScheduleDetail,
            patchScheduleDetail,
            deleteScheduleDetail,
            getQuestionPacketList
         }