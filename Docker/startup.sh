echo "Starting application..."
echo "DEV_OS2_DISCOVERY = ${API_DISCOVERY}"
envsubst < "/usr/share/nginx/html/environment-config.json" > "/usr/share/nginx/html/environment-config.json"
nginx -g 'daemon off;'