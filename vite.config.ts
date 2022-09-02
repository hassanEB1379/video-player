import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

const pwa = VitePWA({
    registerType: 'autoUpdate' ,
    devOptions: {
        enabled: true
    },
    injectRegister: 'inline',
    manifest: {
        'name':'Video player',
        'short_name':'Video player',
        'icons':[
            {
                'src':'/images/android-chrome-192x192.png',
                'sizes':'192x192',
                'type':'image/png'
            },
            {
                'src':'/images/android-chrome-512x512.png',
                'sizes':'512x512',
                'type':'image/png'
            }
        ],
        'theme_color':'#06283D',
        'background_color':'#06283D',
        'display':'standalone',
        'start_url': '.',
        'id': '/video-player'
    },
    workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }
})

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), pwa],
    server: {
        port: 9000,
        host: 'localhost',
        https: {
            key: './localhost-key.pem',
            cert: './localhost.pem',
        }
    }
})
