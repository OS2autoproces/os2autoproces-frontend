echo "Starting application..."
echo "OS2_DISCOVERY = ${API_DISCOVERY}"
envsubst < /environment-config.json > /temp.json && mv /temp.json /usr/share/nginx/html/environment-config.json && nginx -g 'daemon off;'