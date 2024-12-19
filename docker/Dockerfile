FROM nginx:1.24
COPY dist /usr/share/nginx/html/dist/
COPY nginx.conf /etc/nginx/
COPY app.conf /etc/nginx/conf.d/
COPY frontendShell.sh /usr/share/nginx/html/
RUN chmod +x /usr/share/nginx/html/frontendShell.sh
WORKDIR /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["/usr/share/nginx/html/frontendShell.sh"]