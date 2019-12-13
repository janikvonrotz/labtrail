<img height="100px" width="100px" src="/app/public/favicon.png" alt="Logo" />

# LabTrail

QR-code manager with multi-tenant support.

This project is sponsored by the [bioprocess technology division of the ZHAW](https://www.zhaw.ch/en/lsfm/institutes-centres/icbt/biocatalysis-and-process-technology/).

LabTrail is the central platform to manage the destinations of QR-Codes. Register new QR-Codes and define multiple link targets. Manage users and assign them to tenants. Switch easily between tenants and their active QR-Code category.

![Screenshot](/screenshot.png)

## Setup

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

## Deployment

Configure environment variables and deploy with [now](https://zeit.co/now).

`now`
