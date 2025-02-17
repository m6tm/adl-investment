#!/bin/bash
set -e

# S'assurer que le fichier de log existe
if [ ! -f /var/www/storage/logs/laravel.log ]; then
    mkdir -p /var/www/storage/logs
    touch /var/www/storage/logs/laravel.log
fi

# Ajuster les permissions pour que l'utilisateur Apache (www-data) puisse écrire
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

cp /var/www/public/build/.vite/manifest.json /var/www/public/build/manifest.json

# Lancer la commande passée en argument (apache2-foreground par exemple)
exec "$@"
