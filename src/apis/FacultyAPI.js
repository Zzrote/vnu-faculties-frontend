import {createRequest} from './index'
import { getCookie } from '../helper/Cookie'

export const findAll = async () => {
    return await createRequest({
        url : 'faculties',
        method : 'GET'
    })
}

export const findById = async (facultyId) => {
    return await createRequest({
        url : 'faculties/'+facultyId,
        method : 'GET'
    })
}

export const updateById = async({ facultyId , payload }) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'faculties/'+facultyId.toString(),
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
        url : 'faculties',
        method : 'POST',
        data : payload,
        headers
    })
}


export const removeById = async(facultyId) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'faculties/'+facultyId.toString(),
        method : 'DELETE',
        headers
    })
}