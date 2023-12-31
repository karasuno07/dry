# !/usr/bin/env bash

envsubst '$${NEXTJS_CONTAINER_IP}' < /etc/nginx/conf.d/dev-nginx.conf > /etc/nginx/conf.d/default.conf 
rm -rf /etc/nginx/conf.d/dev-nginx.conf
nginx -g "daemon off;"