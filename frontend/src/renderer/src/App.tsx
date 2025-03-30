import { useEffect, useState } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App(): JSX.Element {
  const [healthStatus, setHealthStatus] = useState<string>('Checking...')

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus(`✅ Backend OK | Uptime: ${Math.floor(data.uptime)}s`)
      })
      .catch((err) => {
        setHealthStatus('❌ Backend Unreachable')
        console.error('Health check failed:', err)
      })
  }, [])

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>

      <div className="health-status">{healthStatus}</div>

      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>

      <Versions />
    </>
  )
}

export default App
