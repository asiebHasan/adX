import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/ads/',
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
    fetchAds: () => api.get(''),
    fetchAd: (id) => api.get(`${id}/`),
    createAd: (data) => api.post('', data),
    updateAd: (id, data) => api.put(`${id}/`, data),
    deleteAd: (id) => api.delete(`${id}/`),
}