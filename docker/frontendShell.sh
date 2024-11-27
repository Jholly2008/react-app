#!/bin/sh
envsubst < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf
nginx -g "daemon off;"