import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Vite proxy forwards /api → backend
  headers: {
    'Content-Type': 'application/json'
  }
})

// attach token automatically to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const authService = {
  /**
   * Register new user
   * @param {Object} payload { name, email, password, role }
   */
  register: (payload) => 
    api.post('/auth/register', payload).then(res => res.data),

  /**
   * Login user
   * @param {Object} payload { email, password }
   */
  login: (payload) => 
    api.post('/auth/login', payload).then(res => res.data),

  /**
   * Get logged in user profile (validates token)
   */
  getProfile: () => 
    api.get('/auth/profile').then(res => res.data)
}

export default authService
