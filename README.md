# EduLab

This a proof of concept to show a specific workflow:

1. User receives mail with personal link to app
2. User opens link and receives notification to scan QR code
3. User scans QR code with his phone
4. User is forwarded to app and sees a notice

## Concept

Create a set of usernames:

"janik"

Foreach create base64 hash:

"amFuaWsK"

Create route that takes token param "https://example.com/auth?token=amFuaWsK".

Generate a jwt token and save it to local storage or bearer header.

Create QR code that points to "https://example.com/qr".

If jwt token exists it will show username and confirm scan.

## Links

https://github.com/auth0/node-jsonwebtoken

## Environment Variables

```
JWT_SECRET=SECRET_KEY
```