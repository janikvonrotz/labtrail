FROM node:12-alpine as build

# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package*.json .

# Copy packages
COPY ./typeface-helveticarounded-bold ./typeface-helveticarounded-bold
COPY ./app ./app

# Install dependencies for packages
RUN yarn workspace app install

# Workaround for static env vars
ENV REACT_APP_APOLLO_URL=/api

# Build the app
WORKDIR /usr/src/app
RUN yarn build

# Change base image
FROM nginx:1.15-alpine

# Copy static build folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy config file

COPY ./etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Expose default port
EXPOSE 80

# Run ther web server
CMD ["nginx", "-g", "daemon off;"]