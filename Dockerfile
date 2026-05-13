FROM nginx:alpine

# Copy the static website files to the default nginx public directory
COPY website/ /usr/share/nginx/html/

# Expose port 80 to access the website
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
