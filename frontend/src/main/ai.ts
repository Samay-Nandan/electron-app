import { spawn } from 'child_process'
import { join } from 'path'
import { app } from 'electron'
import { getEnv, killPort } from '@shared/index'

let aiServer: ReturnType<typeof spawn> | null = null

export const launchAIServer = async (): Promise<void> => {
  if (!app.isPackaged) return

  await killPort(+getEnv('AI_SERVER_PORT'))

  const aiServerPath = join(process.resourcesPath, 'ai')
  aiServer = spawn(aiServerPath, [], { stdio: 'inherit' })

  aiServer.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`)
  })

  aiServer.on('error', (err) => {
    console.error('Failed to start Ai Server process:', err)
  })

  app.once('before-quit', () => {
    if (aiServer && !aiServer.killed) aiServer.kill()
  })
}
