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
    build: {
        manifest: true, // 🔥 Ajoute ceci pour générer le manifest.json
        outDir: 'public/build', // Assure-toi que les fichiers sont générés au bon endroit
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            'simple-peer': 'simple-peer/simplepeer.min.js',
        },
    }
});
