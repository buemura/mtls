# mtls
mtls

## Set up
1. Install services dependencies
```bash
cd service-a && npm ci
cd ../service-b && npm ci
```

2. Start apps
```bash
npm run start:dev
npm run start:dev
```

3. Send GET request to endpoints:
- http://localhost:3001/secure
  - This endpoint is secure and requires service-b to send certificates in the request and the certificates will be validated in service-a.
- http://localhost:3001/not-secure
  - This endpoint is not secure and does not require service-b to send certificates in the request. Service-A will not validate certificates for this endpoint.
