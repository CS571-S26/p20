import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: replace <REPO_NAME> with your GitHub repo name
  // Example: if the repo is "MadisonEats", use base: '/MadisonEats/'
  base: '/<REPO_NAME>/',
})
