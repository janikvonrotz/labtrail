<img height="100px" width="100px" src="/app/public/favicon.png" alt="Logo" />

# LabTrail

![](https://github.com/janikvonrotz/labtrail/workflows/Node%20CI/badge.svg)

QR-code manager with multi-tenant support.

This project is sponsored by the [bioprocess technology division of the ZHAW](https://www.zhaw.ch/en/lsfm/institutes-centres/icbt/biocatalysis-and-process-technology/).

LabTrail is the central platform to manage the destinations of QR-Codes. Register new QR-Codes and define multiple link targets. Manage users and assign them to tenants. Switch easily between tenants and their active QR-Code category.

<img width="500px" src="/docs/assets/screenshot.png" alt="Screenshot" />

## Configuration

### Database

For search performance text indexes are required on every mongodb collection. Index the following fields:

```
categories.name
documents.title
tenants.name
stations.name
user.firstname
user.lastname
user.email
```

### Environment Variables

**.env**

```
MONGODB_URI=mongodb://USERNAME:PASSWORD@URL:PORT/DATABASENAME
JWT_SECRET=SECRET_KEY
# Deployment - Docker:
API_VERSION=X.X.X
APP_VERSION=X.X.X
QR_VERSION=X.X.X
```

Checkout each packagefolder for environment variable definitions.

## Development

Install package dependencies with yarn workspace.

`yarn`

Run the development server.

`yarn dev`

### Package

Every package can be developed standalone.

Configure the package environment variables and start the development server.

`yarn dev`

### Testing

Run the linter first.

`yarn lint`

Configure the package environment variables and then run the tests.

`yarn test`

## Deployment

### Serverless

Configure the environment variables and deploy with [now](https://zeit.co/now).

`now`

### Docker

Configure the environment variables and build the docker images.

```
yarn docker-build-api
yarn docker-build-app
yarn docker-build-qr
```

Run docker compose.

`yarn docker-compose`
