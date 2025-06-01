import fs from 'fs'
import findUp from 'find-up'

const isPkg =
  typeof process !== 'undefined' &&
  typeof (process as NodeJS.Process & { pkg?: unknown }).pkg !== 'undefined'

const cwd = isPkg ? process.cwd() : __dirname

const configPath = findUp.sync('config.json', { cwd })

if (!configPath || !fs.existsSync(configPath)) {
  throw new Error(`config.json not found at: ${configPath}`)
}

const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export const getEnv = (key: string, fallback?: string): string => {
  return configData[key] ?? fallback ?? ''
}
