import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/fabenejr.github.io',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        open: true,
        host: true
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu', '@radix-ui/react-separator', '@radix-ui/react-slot'],
                    'animation-vendor': ['framer-motion'],
                    'i18n-vendor': ['i18next', 'react-i18next']
                },
                assetFileNames: 'assets/[name].[ext]'
            }
        },
        chunkSizeWarningLimit: 1000,
    }
});
