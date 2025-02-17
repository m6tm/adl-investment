# Utilisation de l'image de base Laravelfans/Laravel
FROM laravelfans/laravel:latest

# Définir le répertoire de travail
WORKDIR /var/www

# Copier le code source dans le conteneur
COPY . /var/www

# Installer l'extension bcmath et la dépendance laravel-lang/locales
RUN docker-php-ext-install bcmath && \
    composer require laravel-lang/locales

# Installer les dépendances sans les packages de développement
RUN composer install --no-dev --optimize-autoloader

# Précompiler la configuration, les routes et les vues
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Exposer le port 80 (Apache écoute sur ce port par défaut)
EXPOSE 80

# Démarrer Apache en mode premier plan
CMD ["apache2-foreground"]