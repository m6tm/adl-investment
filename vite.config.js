import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/sass/partials/winning.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
            ],
        },
    },
});