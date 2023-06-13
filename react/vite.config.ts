import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// TODO : Séparer en chunks par page pour améliorer les perfs
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    //minify: false
  }
})
