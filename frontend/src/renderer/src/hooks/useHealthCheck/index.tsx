import { useEffect, useState } from 'react'
import { apiNodeServer, nodeServerEndpoints } from '@renderer/constants'

export const useHealthCheck = (): string => {
  const [status, setStatus] = useState<string>('Checking...')

  useEffect(() => {
    const fetchHealthStatus = async (): Promise<void> => {
      try {
        const { data } = await apiNodeServer.get(nodeServerEndpoints.HEALTH_CHECK)
        setStatus(`✅ Backend OK | Uptime: ${Math.floor(data.uptime)}s | Time: ${data.timestamp}`)
      } catch {
        setStatus('❌ Backend Unreachable')
      }
    }

    fetchHealthStatus()
  }, [])

  return status
}
