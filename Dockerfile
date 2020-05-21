#==================== Building Stage =====================================
FROM node:14.2.0 as node

WORKDIR /app

# Copy dependency configuration files
COPY package.json /app
COPY package-lock.json /app

# Install dependencies
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
FROM nginx:1.17.10-alpine

EXPOSE 80

WORKDIR /usr/share/nginx/html

# URL for os2autoproces api - defaults to development URL
ENV API_AUTOPROCES 'https://dev.os2autoproces.eu'

# Copy nginx configuration file
COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application to the nginx root
COPY --from=node /app/dist/ /usr/share/nginx/html

# Copies and runs startup script
COPY Docker/startup.sh /startup.sh
CMD /bin/sh /startup.sh
