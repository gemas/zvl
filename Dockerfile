# Use a builder stage to separate Assets from the rest of the website
FROM nginx:alpine AS builder
COPY website/ /website/
RUN rm -rf /website/Assets

FROM nginx:alpine

# Cache the Assets folder separately as it changes rarely
COPY website/Assets/ /usr/share/nginx/html/Assets/

# Copy the rest of the static website files
COPY --from=builder /website/ /usr/share/nginx/html/

# Expose port 80 to access the website
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
