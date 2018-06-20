#==================== Building Stage =====================================
FROM node:10.4.1 as node

WORKDIR /app

# Copy dependency configuration files
COPY package.json /app
COPY package-lock.json /app

# Install dependecies
RUN npm install

# Copy source files
COPY src /app/src
COPY public /app/public

# Copy build configuration files
COPY tsconfig.json /app
COPY babel.config.js /app
COPY .postcssrc.js /app

# Build the application
RUN npm run build

#==================== Setting up stage ====================
FROM nginx:1.15.0-alpine

EXPOSE 80

WORKDIR /usr/share/nginx/html

# URL for discovery page - defaults to development URL
ENV API_DISCOVERY 'https://dev.os2autoproces.eu/saml/discovery?entityID=https%3A%2F%2Fdev.os2autoproces.eu%2F'

# URL for os2autoproces api - defaults to development URL
ENV API_AUTOPROCES 'https://dev.os2autoproces.eu/api'

# Copy nginx configuration file
COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy environment configuration file
COPY Docker/environment-config.json /

# Copy the built application to the nginx root
COPY --from=node /app/dist/ /usr/share/nginx/html

# Copies and runs startup script
COPY Docker/startup.sh /startup.sh
CMD /bin/sh /startup.sh
