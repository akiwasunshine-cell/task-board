import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages ではリポジトリ名のサブパス（/task-board/）で配信される
  base: '/task-board/',
})
