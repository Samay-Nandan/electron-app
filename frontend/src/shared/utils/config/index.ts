import fs from 'fs'
import path from 'path'

const configPath = path.resolve(__dirname, '..', '..', 'config.json')
const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export const getEnv = (key: string, fallback?: string): string => {
  return configData[key] ?? fallback ?? ''
}
