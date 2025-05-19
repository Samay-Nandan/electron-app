import { useEffect, useState } from 'react'

export const useHealthCheck = (): string => {
  const [status, setStatus] = useState<string>('Checking...')

  useEffect(() => {
    const fetchHealthStatus = async (): Promise<void> => {
      try {
        const port = window.api.env.NODE_SERVER_PORT
        const response = await fetch(`http://127.0.0.1:${port}/api/health`)
        const data = await response.json()
        setStatus(`✅ Backend OK | Uptime: ${Math.floor(data.uptime)}s | Time: ${data.timestamp}`)
      } catch {
        setStatus('❌ Backend Unreachable')
      }
    }

    fetchHealthStatus()
  }, [])

  return status
}
