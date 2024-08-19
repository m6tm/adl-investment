FROM php:8.1-fpm

# Installer les extensions PHP nécessaires
RUN apt-get update && apt-get install -y libzip-dev zip git
RUN docker-php-ext-install pdo pdo_mysql bcmath

# Autoriser l'exécution de Composer en tant que super utilisateur
ENV COMPOSER_ALLOW_SUPERUSER=1

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Créer le repertoire de travail
RUN mkdir -p /var/www/html
RUN rm -rf /var/www/html/*

# Définir le répertoire de travail
WORKDIR /var/www/html

# Créer un utilisateur root nommé "m6tm"
RUN if ! id -u m6tm > /dev/null 2>&1; then useradd -m -u 1000 -s /bin/bash m6tm; fi

# Changer le propriétaire du répertoire /var/www/html
RUN chown -R m6tm:m6tm /var/www/html

# Copier le contenu de l'application
COPY . /var/www/html

# Copier Node.js et Yarn depuis l'image précédente
COPY --from=node:20.16 /usr/local/bin/node /usr/local/bin/node
COPY --from=node:20.16 /usr/local/bin/npm /usr/local/bin/npm

# Installer la dernière version de Yarn globalement
RUN npm i -g yarn@latest

# Exposer le port 80
EXPOSE 80