import axios from 'axios'

const serverUrl = 'http://localhost:8000/'

export const createRequest = async ({ url, method, data, params, headers}) => {
    try {
        const response = await axios({
            url: `${serverUrl}${url}`,
            method,
            data,
            params,
            headers
        })

        return response['data']
        
    } catch (e) {
        return {
            success: false,
            message: e.message || e
        }
    }


}