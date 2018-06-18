echo "Starting application..."
echo "OS2_DISCOVERY = ${API_DISCOVERY}"
echo "OS2_AUTOPROCES = ${API_AUTOPROCES}"

# Write environment variables to json file. The file is used by the frontend to read configuration
envsubst < /environment-config.json > /temp.json && mv /temp.json /usr/share/nginx/html/environment-config.json && nginx -g 'daemon off;'