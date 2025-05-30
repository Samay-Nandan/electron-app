import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { getEnv } from '@shared/utils'

export const createMainWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (is.dev && getEnv('ELECTRON_RENDERER_URL')) {
    await mainWindow.loadURL(getEnv('ELECTRON_RENDERER_URL'))
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
