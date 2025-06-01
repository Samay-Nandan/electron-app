import fs from 'fs'
import findUp from 'find-up'

const configPath = findUp.sync('config.json', { cwd: __dirname })
if (!configPath) throw new Error('config.json not found!')

const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export const getEnv = (key: string, fallback?: string): string => {
  return configData[key] ?? fallback ?? ''
}
