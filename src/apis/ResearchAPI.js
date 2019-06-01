import {createRequest} from './index'
import { getCookie } from '../helper/Cookie'

export const findAll = async () => {
    return await createRequest({
        url : 'researchs',
        method : 'GET'
    })
}

export const findById = async (researchId) => {
    return await createRequest({
        url : 'researchs/'+researchId.toString(),
        method : 'GET'
    })
}

export const updateById = async({ researchId , payload }) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'researchs/'+researchId.toString(),
        method : 'PUT',
        data : payload,
        headers
    })
}

export const save = async( payload ) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'researchs',
        method : 'POST',
        data : payload,
        headers
    })
}

export const removeById = async(researchId) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'researchs/'+researchId.toString(),
        method : 'DELETE',
        headers
    })
}

export const findFacultyByResearch = async (researchId) => {
    return await createRequest({
        url : 'researchs/'+researchId.toString()+'/faculties',
        method : 'GET'
    })
}