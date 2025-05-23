import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { spawn } from 'child_process'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import { getEnv, killPorts } from '@shared/index'
import icon from '../../resources/icon.png?asset'

async function createWindow(): Promise<void> {
  const isProd = app.isPackaged

  if (isProd) {
    await killPorts([+getEnv('NODE_SERVER_PORT')])

    const backendPath = join(process.resourcesPath, 'server')
    const backend = spawn(backendPath, [], {
      stdio: 'inherit'
    })

    backend.on('exit', (code) => {
      console.log(`Backend exited with code ${code}`)
    })

    backend.on('error', (err) => {
      console.error('Failed to start backend process:', err)
    })

    app.once('before-quit', () => {
      if (!backend.killed) backend.kill()
    })
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  // Log the app version on startup
  console.log('🚀 App runtime version:', app.getVersion())

  // Expose app version to the frontend via IPC
  ipcMain.handle('get_app_version', () => {
    return app.getVersion()
  })

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'Samay-Nandan',
    repo: 'electron-app'
  })

  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('update-available', () => {
    console.log('🔄 Update available!')
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('update_available')
    })
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('✅ No updates available:', info)
  })

  autoUpdater.on('download-progress', (progress) => {
    console.log('⬇️ Download progress:', progress)
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('✅ Update downloaded!')
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('update_downloaded')
    })
  })

  autoUpdater.on('error', (err) => {
    console.error('❌ Error in auto-updater:', err)
  })

  ipcMain.on('restart_app', () => {
    console.log('♻️ Restarting app to install update...')
    autoUpdater.quitAndInstall()
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
