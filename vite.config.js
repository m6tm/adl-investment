import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/sass/app.scss',
                'resources/sass/partials/winning.scss',
            ],
            refresh: true,
        }),
    ],
    vite: {
        define: {
            global: {},
        }
    },
    resolve: {
        alias: {
            'simple-peer': 'simple-peer/simplepeer.min.js',
        },
    }
});
