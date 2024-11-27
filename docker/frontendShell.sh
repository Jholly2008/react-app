#!/bin/sh
envsubst '$GATEWAY_URL' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf
nginx -g "daemon off;"