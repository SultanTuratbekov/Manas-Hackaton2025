import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'https://www2.daad.de/',
})

export { api }
