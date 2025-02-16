#!/bin/sh

# Wait for database connection (si nécessaire, décommente la ligne ci-dessous)
# sleep 10

# Run Laravel migrations (optionnel, mais utile en production)
php artisan migrate --force

# Start PHP-FPM
exec "$@"
