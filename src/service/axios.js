import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'http://16.171.231.234:8000/course/search',
})

export { api }
