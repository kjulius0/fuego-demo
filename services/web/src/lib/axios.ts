import axios from 'axios'

// Configure axios defaults globally
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888'

// You can add other global configurations here:
// axios.defaults.timeout = 10000
// axios.defaults.headers.common['Authorization'] = 'Bearer token'

export default axios