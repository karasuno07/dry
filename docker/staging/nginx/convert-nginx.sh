# !/usr/bin/env bash

envsubst '$${NEXTJS_CONTAINER_IP} ${QBITTORENT_CONTAINER_ID} ${SONARR_CONTAINER_ID} ${RADARR_CONTAINER_ID} ${OVERSEERR_CONTAINER_ID} ${JACKETT_CONTAINER_ID} ${ADMINER_CONTAINER_ID}' < /etc/nginx/conf.d/nginx.dev.conf > /etc/nginx/conf.d/default.conf 
rm -rf /etc/nginx/conf.d/nginx.dev.conf
nginx -g "daemon off;"