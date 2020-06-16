// Axios
import axios from 'axios'

const instance = axios.create({
    baseURL: 'Your Firebase Database URL here'
})

export default instance