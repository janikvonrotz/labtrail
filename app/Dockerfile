FROM node:10-alpine as build

# Workaround for static env vars
ENV REACT_APP_APOLLO_URL=/api

# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package*.json .

# Copy packages
COPY ./typeface-helveticarounded-bold ./typeface-helveticarounded-bold
COPY ./app ./app

# Install dependencies for packages
RUN yarn workspace app install

# Build the app
WORKDIR /usr/src/app
RUN yarn build

# Run the app
FROM nginx:1.15-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]