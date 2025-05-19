import axios from 'axios'

export const apiNodeServer = axios.create({
  baseURL: window.api.NODE_SERVER_URL
})

export const nodeServerEndpoints = {
  HEALTH_CHECK: '/api/health'
}
