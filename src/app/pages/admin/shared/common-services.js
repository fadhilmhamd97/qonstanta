import { MASTER_API } from "../../../Configuration"
import axios from "axios"

const getHierarchyTree = () => {
    return axios.get(`${MASTER_API}/hierarchy`)
}

const postHierarchyTree = data => {
    return axios.post(`${MASTER_API}/hierarchy`, data)
}

const patchHierarchyTree = (data, id) => {
    return axios.patch(`${MASTER_API}/hierarchy/${id}`, data)
}

const deleteHierarchyTree = id => {
    return axios.delete(`${MASTER_API}/hierarchy/${id}`)
}

export {
    getHierarchyTree,
    postHierarchyTree,
    patchHierarchyTree,
    deleteHierarchyTree
}