import { ipcMain, app } from 'electron'

export const setupIpcHandlers = (): void => {
  ipcMain.on('ping', () => {
    console.log('pong')
  })

  ipcMain.handle('get_app_version', () => {
    return app.getVersion()
  })

  ipcMain.on('restart_app', () => {
    console.log('Restart requested from renderer (handled by autoUpdater)')
  })
}
