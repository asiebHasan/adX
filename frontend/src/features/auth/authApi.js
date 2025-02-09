import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/auth/',
    headers: {
        'Content-Type': 'application/json',
    },
})


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        console.log(token)
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default {
    login: (credentials) => api.post('login/', credentials),
    register: (data) => api.post('register/', data),
    passwordReset: (data) => api.post('password_reset/', data),
    changePassword: (data) => api.post('change_password/', data),
    profile: (data) => api.get('profile/', data),
}