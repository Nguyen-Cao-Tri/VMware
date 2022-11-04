# FROM node:18-alpine as build-deps 

# #create app dircetory
# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json .

# RUN npm install

# #Bundle app source
# COPY . .

# # Build the app
# RUN npm run build

# FROM nginx:alpine

# COPY deployments/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

# EXPOSE 80

# # Start the app
# CMD [ "nginx", "-g", "daemon off;" ]


# 1. For build React app
FROM node:lts AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# 2. For Nginx setup
FROM nginx:alpine
# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]