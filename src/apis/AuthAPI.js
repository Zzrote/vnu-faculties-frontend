import {createRequest} from './index'

export const login = async (payload) => {
    return await createRequest({
        url : 'login',
        method : 'POST',
        data : payload
    })
}
