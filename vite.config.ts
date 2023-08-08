import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    Components({
      resolvers: [IconsResolver({ prefix: "" })]
    }),

    Icons({
      autoInstall: true
    })
  ],
  server: {
    host: 'localhost',
    port: 2000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
