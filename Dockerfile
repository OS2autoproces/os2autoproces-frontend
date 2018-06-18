
#==================== Building Stage =====================================
FROM node:10.4.1 as node

WORKDIR /app

# Copies dependencies configuration file
COPY package.json /app
COPY package-lock.json /app

# Install dependecies
RUN npm install

# Copy sources files and typescript configuration for build
COPY src /app/src
COPY public /app/public
COPY tsconfig.json /app

# Build the application
RUN npm run build

#==================== Setting up stage ====================
# Create image based on the official nginx
FROM nginx:1.15.0-alpine

EXPOSE 80

WORKDIR /usr/share/nginx/html

# Endpoint for Discovery Page - defaults to development
ENV API_DISCOVERY 'https://dev.os2autoproces.eu/saml/discovery?entityID=https%3A%2F%2Fdev.os2autoproces.eu%2F'

# Enpoint for os2autoproces api - defaults to development
ENV API_AUTOPROCES 'https://dev.os2autoproces.eu/api'

# Copy nginx configuration file
COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy environment configuration file
COPY Docker/environment-config.json /

# Copy application
COPY --from=node /app/dist/ /usr/share/nginx/html

# Copies and runs startup script
COPY Docker/startup.sh /startup.sh
CMD /bin/sh -c "/startup.sh"
