FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package*.json .

# Copy packages
COPY ./api ./api
COPY ./mongo ./mongo

# Install dependencies for packages
RUN yarn workspace mongo install
RUN yarn workspace api install

# Run the app
WORKDIR /usr/src/api
EXPOSE 3000
CMD ["yarn", "start"]