# !/usr/bin/env bash

envsubst '$${NEXTJS_CONTAINER_IP} ${ADMINER_CONTAINER_ID}' < /etc/nginx/conf.d/nginx.dev.conf > /etc/nginx/conf.d/default.conf 
rm -rf /etc/nginx/conf.d/nginx.dev.conf
nginx -g "daemon off;"