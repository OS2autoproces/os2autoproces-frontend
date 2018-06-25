echo "Starting application..."
# Write the environment variables to a json file.
# The file is used by the frontend to read the environment configuration.
envsubst < environment-config.js > temp.js && mv temp.js environment-config.js && nginx -g 'daemon off;'