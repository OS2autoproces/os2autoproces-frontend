
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

COPY src /app/src
COPY public /app/public
COPY tsconfig.json /app

# Build the App
RUN npm run build

#==================== Setting up stage ====================
# Create image based on the official nginx
FROM nginx:1.15.0-alpine

# Expose port
EXPOSE 80

COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY Docker/environment-config.json /

COPY --from=node /app/dist/ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

# Overwrite environment variables
COPY Docker/startup.sh /startup.sh
CMD /bin/sh -c "/startup.sh"
