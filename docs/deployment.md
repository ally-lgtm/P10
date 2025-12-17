# Deployment

## Live URLs

### Frontend (AWS Amplify)

- **URL**: https://main.d1lzr92s882bej.amplifyapp.com

### API (API Gateway HTTP API)

- **Base URL**: https://c8dtsdalqd.execute-api.us-east-1.amazonaws.com
- **Health check**: https://c8dtsdalqd.execute-api.us-east-1.amazonaws.com/health

## AWS Details

- **AWS Account**: 877901377289
- **Region**: us-east-1

### Lambda

- **Function name**: p10-api-dev-api
- **Runtime**: nodejs20.x
- **Memory**: 512 MB
- **Timeout**: 30s

### API Gateway

- **Type**: HTTP API
- **API ID**: c8dtsdalqd
- **Invoke base**: https://c8dtsdalqd.execute-api.us-east-1.amazonaws.com

### Secrets Manager

- **Secret name (SECRETS_ID)**: P10/api/prod
- **Secret ARN**: arn:aws:secretsmanager:us-east-1:877901377289:secret:P10/api/prod-YawXyS
- **Used by**: Lambda cold start loads the secret JSON and sets values into `process.env`.

## Supabase

- **Project ref**: svpsshdzqelslikpxioy
- **Project URL**: https://svpsshdzqelslikpxioy.supabase.co

Notes:
- Do not store Supabase secret/service-role keys in this repo.
- Any rotated Supabase keys should be updated in AWS Secrets Manager (`P10/api/prod`).

## CORS

Allowed origins (HTTP API CORS):
- https://main.d1lzr92s882bej.amplifyapp.com
- http://localhost:5173

## Deploy commands

### API deploy (Serverless)

From repo root:

```bash
SECRETS_ID="P10/api/prod" \
AMPLIFY_APP_ORIGIN="https://main.d1lzr92s882bej.amplifyapp.com" \
npm run deploy --prefix api
```

### Verify AWS identity

```bash
aws sts get-caller-identity
```
