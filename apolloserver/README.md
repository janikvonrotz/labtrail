# LabTrail Apollo Server

API of the LabTrail application.

## Playground

Accessing the API requires a JWT token. A mock token can be retrieved from the authserver. Open `/sso/get-mock-token?email=YOUR_EMAIL` and copy the token.

Open the playground ``

```json
{
    "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

## Environment Variables

**.env**

```
MONGODB_URI=mongodb://USERNAME:PASSWORD@URL:PORT/DATABASENAME
JWT_SECRET=SECRET_KEY
```