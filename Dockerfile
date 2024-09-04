# Use an official Node.js image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Install dependencies for Node.js
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn run build
# COPY ./public/img ./img

# Now, move to the PHP Apache image to serve the built app
FROM php:8.1-apache

# Set the working directory
ENV APACHE_DIR /var/www/html

# Install necessary packages and extensions
RUN apt update && apt upgrade -y
RUN apt install -y git zip nano libpq-dev openssh-server lsb-release && docker-php-ext-install pdo pdo_pgsql pgsql

# SSH connection setup
RUN mkdir -p /root/.ssh/
RUN echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDkG2NhuY0MV5PBvE/7fGJ1j73MIlYck05V2L3bmEnKnH2vh9AooY2NhGiBGLetu8T0aZDjeaaTUM/EDL19/59RIsfIVYl6WwgWqITZiO0PuT/1QSStdKmAWPI1SkHM9V5VZpSWhFuIp1KEQyzrrznhNWaArX/5er8XS9QyawCg+wyGcyuQ4WECnEUxDIH0H8LhKm8FxcD+2kwgI9l7w6GAlXJeRwCuZu4uTqDgxCz6+wck2YbyyyJGX+rJrHvMKl9++o5gkS9uIeq0BV24Y0DQbJxhLNWYREU/weXCTN1QWq1QSr0fEpRnQC17Fl+OGS2uf+yTcLMm6LjJQCHytAQN kira@kira" > /root/.ssh/authorized_keys
RUN chmod 600 /root/.ssh/authorized_keys

# Copy the build output from the Node.js stage to the Apache directory
COPY --from=build /app/dist ${APACHE_DIR}/
# COPY --from=build /app/public ${APACHE_DIR}/public

#make it work
COPY --from=build /app/.htaccess /etc/apache2/
# RUN service apache2 restart

RUN mkdir /var/run/sshd
# Expose ports for HTTP and SSH
EXPOSE 80 22

# Start Apache server and SSH
# CMD ["/usr/sbin/sshd", "-D"]

# Start Apache and SSH service
CMD service apache2 restart && /usr/sbin/sshd -D
