import { spawn } from 'child_process'
import { join, resolve } from 'path'
import { app } from 'electron'
import { getEnv, killPort } from '@shared/index'

let aiServer: ReturnType<typeof spawn> | null = null

export const launchAIServer = async (): Promise<void> => {
  if (!app.isPackaged) return

  await killPort(+getEnv('AI_SERVER_PORT'))

  const aiServerPath = join(process.resourcesPath, 'ai')
  const configPath = resolve(process.resourcesPath, 'config.json')

  aiServer = spawn(aiServerPath, [], {
    stdio: 'inherit',
    cwd: process.resourcesPath,
    env: {
      ...process.env,
      CONFIG_PATH: configPath
    }
  })

  aiServer.on('exit', (code) => {
    console.log(`AI server exited with code ${code}`)
  })

  aiServer.on('error', (err) => {
    console.error('Failed to start AI server process:', err)
  })

  app.once('before-quit', () => {
    if (aiServer && !aiServer.killed) aiServer.kill()
  })
}
