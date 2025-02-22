import axios from 'axios'

const gpt = axios.create({
    baseURL: 'http://localhost:8000/course/',
})

export { gpt }
