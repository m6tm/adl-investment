# Utilisation de l'image de base officielle PHP avec Apache
FROM php:8.1-apache

# Définir le répertoire de travail
WORKDIR /var/www

# Installer les extensions PHP nécessaires et Composer
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd bcmath pdo pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installer Node.js et Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Copier les fichiers du projet dans le conteneur
COPY . /var/www

RUN yarn \
    && yarn build

# Définir ServerName pour supprimer les avertissements
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Ajouter les configurations pour activer mod_rewrite et autres optimisations
RUN echo "\
    <VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /var/www/public\n\
    <Directory /var/www/public>\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
    </VirtualHost>" > /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Changer les permissions pour storage et bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Installer les dépendances sans les packages de développement
RUN composer install --no-dev --optimize-autoloader --prefer-dist

# Précompiler les configurations, les routes et les vues
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Exposer le port 80 (Apache écoute sur ce port par défaut)
EXPOSE 80

# Copier le script d'entrypoint dans l'image
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Définir l'entrypoint et la commande par défaut
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
# Démarrer Apache en mode premier plan
CMD ["apache2-foreground"]
