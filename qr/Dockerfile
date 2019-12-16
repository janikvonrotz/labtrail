FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package*.json .

# Copy packages
COPY ./qr ./qr

# Install dependencies for packages
RUN yarn workspace qr install

# Run the app
WORKDIR /usr/src/qr
EXPOSE 3000
CMD ["yarn", "start"]