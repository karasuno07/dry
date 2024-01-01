# !/usr/bin/env bash

envsubst '$${NEXTJS_CONTAINER_IP} ${ADMINER_CONTAINER_ID}' < /etc/nginx/conf.d/nginx.prod.conf > /etc/nginx/conf.d/default.conf 
rm -rf /etc/nginx/conf.d/nginx.prod.conf
nginx -g "daemon off;"