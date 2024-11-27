FROM nginx:1.24
COPY dist /usr/share/nginx/html/dist/
COPY nginx.conf /etc/nginx/
COPY app.conf.template /etc/nginx/conf.d/
COPY frontendShell.sh /usr/share/nginx/html/
RUN chmod +x /usr/share/nginx/html/frontendShell.sh
WORKDIR /usr/share/nginx/html
EXPOSE 80
ENV GATEWAY_URL=http://gateway-service.default.svc.cluster.local
ENTRYPOINT ["/usr/share/nginx/html/frontendShell.sh"]