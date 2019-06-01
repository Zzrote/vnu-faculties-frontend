import {createRequest} from './index'
import { getCookie } from '../helper/Cookie'

export const findAll = async () => {
    return await createRequest({
        url : 'departments',
        method : 'GET'
    })
}

export const findById = async (departmentId) => {
    return await createRequest({
        url : 'departments/'+departmentId.toString(),
        method : 'GET'
    })
}

export const updateById = async({ departmentId , payload }) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'departments/'+departmentId.toString(),
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
        url : 'departments',
        method : 'POST',
        data : payload,
        headers
    })
}


export const removeById = async(departmentId) => {
    const token = getCookie('token')
    const headers = {
        "Authorization" : "Bearer " + token
    }
    return await createRequest({
        url : 'departments/'+departmentId.toString(),
        method : 'DELETE',
        headers
    })
}

export const findFacultyByDepartment = async (departmentId) => {
    return await createRequest({
        url : 'departments/'+departmentId.toString()+'/faculties',
        method : 'GET'
    })
}