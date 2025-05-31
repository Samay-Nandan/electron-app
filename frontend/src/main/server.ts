import { spawn } from 'child_process'
import { join } from 'path'
import { app } from 'electron'
import { getEnv, killPort } from '@shared/index'

let backend: ReturnType<typeof spawn> | null = null

export const launchServer = async (): Promise<void> => {
  if (!app.isPackaged) return

  await killPort(+getEnv('NODE_SERVER_PORT'))

  const backendPath = join(process.resourcesPath, 'server')
  backend = spawn(backendPath, [], { stdio: 'inherit' })

  backend.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`)
  })

  backend.on('error', (err) => {
    console.error('Failed to start backend process:', err)
  })

  app.once('before-quit', () => {
    if (backend && !backend.killed) backend.kill()
  })
}
