# => installer container
FROM node:10-alpine as installer
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile
COPY . .

# => Builder container
FROM installer as builder
RUN yarn build


# => Run container
FROM nginx:1.15.2-alpine

# Add bash
RUN apk add --no-cache bash

# Nginx config
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY env.sh .env ./

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]