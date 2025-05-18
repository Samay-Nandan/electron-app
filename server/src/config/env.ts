import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(process.cwd(), '../.env') });

export const getEnv = (key: string, fallback?: string | number): string => {
  const value = process.env[key];
  return value !== undefined ? value : String(fallback ?? '');
};
