import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createMainWindow } from '@main/app'
import { setupAutoUpdater } from '@main/autoUpdater'
import { setupIpcHandlers } from '@main/ipc'
import { launchServer } from '@main/server'

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window))

  setupIpcHandlers()
  setupAutoUpdater()
  await launchServer()
  await createMainWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
