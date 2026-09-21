import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages as a project page:
// https://fahadramxan.github.io/Fahad-Ramzan-Portfolio/
// so assets must resolve under that sub-path in production.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Fahad-Ramzan-Portfolio/' : '/',
  plugins: [react()],
}))
