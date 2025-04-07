# mtls
This repository demonstrates a simple implementation of Mutual TLS (mTLS) between two services: service-a and service-b.

## What is Mutual TLS (mTLS)?

Mutual TLS (mTLS) is an extension of standard TLS that enables two-way authentication between a client and a server. In a typical TLS setup, only the server presents a certificate to prove its identity to the client. With mTLS, both the client and the server present certificates and verify each other’s identities. This ensures that:
  - The client trusts the server.
  - The server trusts the client.
In this proof of concept:
  - service-a acts as the server.
  - service-b acts as the client and sends requests to service-a.

Certain endpoints in service-a will validate client certificates (mTLS), while others allow unauthenticated access (non-mTLS).

## Getting Started
## Set up
1. Install services dependencies
Install dependencies for both services:
```bash
cd service-a && npm ci
cd ../service-b && npm ci
```

2. Start the Services
Make sure you are in the root of the project directory, then run:
```bash
# In one terminal
cd service-a
npm run start:dev
```
```bash
# In another terminal
cd service-b
npm run start:dev
```

3. Test the Endpoints
Once both services are running:
Secure Endpoint (Requires mTLS)
```bash
GET http://localhost:3001/secure
```
- This endpoint is protected with mTLS.
- service-b must present a valid certificate to service-a.
- service-a will verify the client certificate before allowing access.

Insecure Endpoint (No mTLS Required)
```bash
GET http://localhost:3001/not-secure
```
- This endpoint does not require a client certificate.
- Accessible by any client, with or without a certificate.

## Project Structure
```markdown
mtls/
├── service-a/      # The server which validates client certs on /secure
├── service-b/      # The client that sends mTLS requests to service-a
└── certs/          # Folder containing self-signed certificates (if present)
```

## Notes
- Certificates used in this example are self-signed and should not be used in production.
- This setup is intended for educational and demonstration purposes only.
- mTLS is commonly used in secure microservice architectures and internal service-to-service communication.
