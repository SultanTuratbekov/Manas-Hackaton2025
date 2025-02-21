import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://www2.daad.de/',
})

export { api }
