import { spawn } from 'child_process'
import { join, resolve } from 'path'
import { app } from 'electron'
import { getEnv, killPort } from '@shared/index'

let nodeServer: ReturnType<typeof spawn> | null = null

export const launchNodeServer = async (): Promise<void> => {
  if (!app.isPackaged) return

  await killPort(+getEnv('NODE_SERVER_PORT'))

  const nodeServerPath = join(process.resourcesPath, 'server')
  const configPath = resolve(process.resourcesPath, 'config.json')

  nodeServer = spawn(nodeServerPath, [], {
    stdio: 'inherit',
    cwd: process.resourcesPath,
    env: {
      ...process.env,
      CONFIG_PATH: configPath
    }
  })

  nodeServer.on('exit', (code) => {
    console.log(`Node server exited with code ${code}`)
  })

  nodeServer.on('error', (err) => {
    console.error('Failed to start Node Server process:', err)
  })

  app.once('before-quit', () => {
    if (nodeServer && !nodeServer.killed) nodeServer.kill()
  })
}
