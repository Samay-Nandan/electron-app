import fs from 'fs';
import path from 'path';

const isPkg = typeof process.pkg !== 'undefined';

const basePath = isPkg ? path.dirname(process.execPath) : path.resolve(__dirname);

const configPath = path.join(basePath, 'config.json');

if (!fs.existsSync(configPath)) {
  throw new Error(`config.json not found at: ${configPath}`);
}

console.log('[Config] Using config.json at:', configPath);

const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export const getEnv = (key: string, fallback?: string): string => {
  return configData[key] ?? fallback ?? '';
};
