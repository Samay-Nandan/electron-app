import { spawn } from 'child_process'
import { join } from 'path'
import { app } from 'electron'
import { getEnv, killPort } from '@shared/index'

let nodeServer: ReturnType<typeof spawn> | null = null

export const launchNodeServer = async (): Promise<void> => {
  if (!app.isPackaged) return

  await killPort(+getEnv('NODE_SERVER_PORT'))

  const nodeServerPath = join(process.resourcesPath, 'server')
  nodeServer = spawn(nodeServerPath, [], { stdio: 'inherit' })

  nodeServer.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`)
  })

  nodeServer.on('error', (err) => {
    console.error('Failed to start Node Server process:', err)
  })

  app.once('before-quit', () => {
    if (nodeServer && !nodeServer.killed) nodeServer.kill()
  })
}
