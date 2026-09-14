import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @returns {Promise<{message: string, status: string}>}
 */
export async function checkHealth() {
  const res = await api.get('/')
  return res.data
}

/**
 * @param {Object} params 
  @returns {Promise<{potability: number, prediction: string, probability: number}>}
 */
export async function predictPotability(params) {
  const res = await api.post('/predict', params)
  return res.data
}
