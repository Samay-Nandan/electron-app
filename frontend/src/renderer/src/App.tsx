import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { useUpdateCheck, useNodeHealthCheck, useAIHealthCheck } from '@renderer/hooks'

function App(): JSX.Element {
  useUpdateCheck()
  const nodeHealthStatus = useNodeHealthCheck()
  const aiHealthStatus = useAIHealthCheck()

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

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

      <div className="health-status">{nodeHealthStatus}</div>
      <div className="health-status">{aiHealthStatus}</div>

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
