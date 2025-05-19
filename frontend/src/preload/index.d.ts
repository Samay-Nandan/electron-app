import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      env: {
        NODE_SERVER_PORT: string
      }
    }
  }
}

export {}
