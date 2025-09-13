import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000/api/employees' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default {
  getAll: () => api.get('/').then(r => r.data.employees || []),
  getById: (id) => api.get(`/${id}`).then(r => r.data.employee),
  create: (payload) => api.post('/', payload).then(r => r.data.employee),
  update: (id, payload) => api.put(`/${id}`, payload).then(r => r.data.employee),
  remove: (id) => api.delete(`/${id}`).then(r => r.data.message)
}
