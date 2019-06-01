import {Cookies} from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (name, value, options) => {
    cookies.set(name, value, options)
}

export const getCookie = (name) => {
    return cookies.get(name) || ''
}

export const clearCookies = () => {
    cookies.remove('userId')
    cookies.remove('userRole')
    cookies.remove('token')
}