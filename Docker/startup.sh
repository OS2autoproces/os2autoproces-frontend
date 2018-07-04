echo "Starting application..."
# Write the environment variables to a JavaScript file.
# The file sets the environment variables as global variables in the browser.
envsubst < environment-config.js > temp.js && mv temp.js environment-config.js && nginx -g 'daemon off;'
