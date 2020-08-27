import axios from 'axios'
import * as api from './api'
import { MASTER_API, createApiRequest } from "../../../../app/Configuration"

/* TYPE */
const getQuestionTypeList = () => {
    return axios.get(MASTER_API + api.API_QUESTION_TYPE_PACKET)
}

const getQuestionTypeById = id => {
    return axios.get(`${MASTER_API + api.API_QUESTION_TYPE_PACKET_DETAIL}/${id}`)
}

const postQuestionType = data => {
    return axios.post(MASTER_API + api.API_QUESTION_TYPE_PACKET_CREATE, data)
}

const patchQuestionType = ({name}, id) => {
    return axios.patch(`${MASTER_API + api.API_QUESTION_TYPE_PACKET_EDIT}/${id}`, name)
}

const deleteQuestionType = id => {
    return axios.delete(`${MASTER_API + api.API_QUESTION_TYPE_PACKET_DELETE}/${id}`)
}

const getQuestions = () => {
    return axios.get(`${MASTER_API}/question`)
}

/* PACKET */

const getQuestionPacketList = () => {
    return axios.get(MASTER_API + api.API_QUESTION_PACKET)
}

const getQuestionPacketById = id => {
    return axios.get(`${MASTER_API + api.API_QUESTION_PACKET_DETAIL}/${id}`)
}

const postQuestionPacket = data => {
    return axios.post(MASTER_API + api.API_QUESTION_PACKET_CREATE, data)
}

const patchQuestionPacket = ({name, questionTotal, duration, description, publish, isActive, questionPacketTypeId, formulaId, hierarchyId}, id) => {
    return axios.patch(`${MASTER_API + api.API_QUESTION_PACKET_EDIT}/${id}`, {name, questionTotal, duration, description, publish, isActive, questionPacketTypeId, formulaId, hierarchyId})
}

const deleteQuestionPacket = id => {
    return axios.delete(`${MASTER_API + api.API_QUESTION_PACKET_DELETE}/${id}`)
}

/* QUESTION */
const getQuestionList = () => {
    return axios.get(MASTER_API + api.API_QUESTION)
}

const getQuestionById = id => {
    return axios.get(`${MASTER_API + api.API_QUESTION_DETAIL}/${id}`)
}

const postQuestion = data => {
    return axios.post(MASTER_API + api.API_QUESTION_CREATE, data)
}

const patchQuestion = ({question, questionType, imageUrl, imageName, videoUrl, videoName, questionPacketId, explanationId}, id) => {
    return axios.patch(`${MASTER_API + api.API_QUESTION_EDIT}/${id}`, {question, questionType, imageUrl, imageName, videoUrl, videoName, questionPacketId, explanationId})
}

const deleteQuestion = id => {
    console.info(id)
    return axios.delete(`${MASTER_API + api.API_QUESTION_DELETE}/${id}`)
}

/* Answer */
const getAnswersList = () => {
    return axios.get(`${MASTER_API}/choice`)
}

const getAnswerById = id => {
    return axios.get(`${MASTER_API}/choice/${id}`)
}

const postAnswer = data => {
    return axios.post(`${MASTER_API}/choice`, data)
}

const patchAnswer = ({choice, correctChoice, imageBase64, imageName, questionId}, id) => {
    return axios.patch(`${MASTER_API}/choice/${id}`, {choice, correctChoice, imageBase64, imageName, questionId})
}

const deleteAnswer = id => {
    return axios.delete(`${MASTER_API}/choice/${id}`)
}

/* COMMON */
const getFormulaList = () => {
    return axios.get(`${MASTER_API}/formula`)
}

const getExplanationList = () => {
    return axios.get(`${MASTER_API}/explanation`)
}

export {
    getQuestionTypeList,
    getQuestionTypeById,
    postQuestionType,
    patchQuestionType,
    deleteQuestionType,
    getQuestionPacketList,
    getQuestionPacketById,
    postQuestionPacket,
    patchQuestionPacket,
    deleteQuestionPacket,
    getQuestionList,
    postQuestion,
    patchQuestion,
    deleteQuestion,
    getQuestionById,
    getFormulaList,
    getQuestions,
    getExplanationList,
    getAnswersList,
    getAnswerById,
    postAnswer,
    patchAnswer,
    deleteAnswer
}