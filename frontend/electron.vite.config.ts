import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { getEnv } from './src/shared'

const sharedAlias = {
  '@renderer': resolve(__dirname, 'src/renderer/src'),
  '@shared': resolve(__dirname, 'src/shared')
}

export default defineConfig({
  main: {
    resolve: {
      alias: sharedAlias
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: sharedAlias
    },
    plugins: [
      react(),
      {
        name: 'inject-node-server-port',
        transformIndexHtml(html) {
          return html.replace(/__NODE_SERVER_PORT__/g, getEnv('NODE_SERVER_PORT'))
        }
      }
    ]
  }
})
