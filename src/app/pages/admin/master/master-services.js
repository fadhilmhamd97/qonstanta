import axios from 'axios'
import * as api from './api'
import { MASTER_API } from "../../../../app/Configuration"

/* GRADE */
const getGradeList = () => {
    return axios.get(`${MASTER_API + api.API_MASTER_GRADE}`)
} 
const getGradeById = id => {
    return axios.get(`${MASTER_API + api.API_MASTER_GRADE}/${id}`)
}
const postGrade = data => {
    return axios.post(`${MASTER_API + api.API_MASTER_GRADE}`, data)
}
const patchGrade = (data, id) => {
    return axios.patch(`${MASTER_API + api.API_MASTER_GRADE}/${id}`, data)
}
const deleteGrade = id => {
    return axios.delete(`${MASTER_API + api.API_MASTER_GRADE}/${id}`)
}

/* FORMULA */
const getFormulaList = () => {
    return axios.get(`${MASTER_API + api.API_MASTER_FORMULA}`)
}
const getFormulaById = id => {
    return axios.get(`${MASTER_API + api.API_MASTER_FORMULA}/${id}`)
}
const postFormula = data => {
    return axios.post(`${MASTER_API + api.API_MASTER_FORMULA}`, data)
}
const patchFormula = (data, id) => {
    return axios.patch(`${MASTER_API + api.API_MASTER_FORMULA}/${id}`, data)
}
const deleteFormula = id => {
    return axios.delete(`${MASTER_API + api.API_MASTER_FORMULA}/${id}`)
}

/* MAJOR */
const getMajorList = () => {
    return axios.get(`${MASTER_API + api.API_MASTER_MAJOR}`)
}
const getMajorById = id => {
    return axios.get(`${MASTER_API + api.API_MASTER_MAJOR}/${id}`)
}
const postMajor = data => {
    return axios.post(`${MASTER_API + api.API_MASTER_MAJOR}`, data)
}
const patchMajor = (data, id) => {
    return axios.patch(`${MASTER_API + api.API_MASTER_MAJOR}/${id}`, data)
}
const deleteMajor = id => {
    return axios.delete(`${MASTER_API + api.API_MASTER_MAJOR}/${id}`)
}

/* COURSE */
const getCourseList = () => {
    return axios.get(`${MASTER_API + api.API_MASTER_COURSE}`)
}
const getCourseById = id => {
    return axios.get(`${MASTER_API + api.API_MASTER_COURSE}/${id}`)
}
const postCourse = data => {
    return axios.post(`${MASTER_API + api.API_MASTER_COURSE}`, data)
}
const patchCourse = (data, id) => {
    return axios.patch(`${MASTER_API + api.API_MASTER_COURSE}/${id}`, data)
}
const deleteCourse = id => {
    return axios.delete(`${MASTER_API + api.API_MASTER_COURSE}/${id}`)
}

export {
    getGradeList,
    getGradeById,
    postGrade,
    patchGrade,
    deleteGrade,
    getCourseList,
    getCourseById,
    postCourse,
    patchCourse,
    deleteCourse,
    getMajorList,
    getMajorById,
    postMajor,
    patchMajor,
    deleteMajor,
    getFormulaList,
    getFormulaById,
    postFormula,
    patchFormula,
    deleteFormula
}