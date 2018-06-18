
#==================== Building Stage =====================================
FROM node:10.4.1 as node

# Creates directory where the application is stationed
RUN mkdir -p /app

# Change directory to application directory
WORKDIR /app

# Copies application dependencies
COPY package.json /app
COPY package-lock.json /app

# Install dependecies
RUN npm install

# Copy application
COPY src /app/src
COPY public /app/public
COPY tsconfig.json /app

# Build the App
RUN npm run build

#==================== Setting up stage ====================
# Create image based on the official nginx
FROM nginx:1.15.0-alpine

# Endpoint for Discovery Page - set default for development
ENV API_DISCOVERY 'https://dev.os2autoproces.eu/saml/discovery?entityID=https%3A%2F%2Fdev.os2autoproces.eu%2F'

# Enpoint for os2autoproces api - set default for development
ENV API_AUTOPROCES 'https://dev.os2autoproces.eu/api'

# Expose port 80 from container
EXPOSE 80

# Get Docker configuration
COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy configuration file
COPY Docker/environment-config.json /

# Copy application
COPY --from=node /app/dist/ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

# Overwrite environment variables
COPY Docker/startup.sh /startup.sh
CMD /bin/sh -c "/startup.sh"
