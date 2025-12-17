'use strict';

const serverlessHttp = require('serverless-http');

let secretsInitPromise;

async function loadSecretsOnce() {
  if (secretsInitPromise) return secretsInitPromise;

  secretsInitPromise = (async () => {
    try {
      if (process.env.IS_OFFLINE) {
        try {
          require('dotenv').config();
        } catch (_e) {
          // ignore
        }
        return;
      }

      const secretId = process.env.SECRETS_ID;
      if (!secretId) return;

      let SecretsManagerClient;
      let GetSecretValueCommand;
      try {
        ({ SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager'));
      } catch (_e) {
        return;
      }

      const client = new SecretsManagerClient({});
      const result = await client.send(new GetSecretValueCommand({ SecretId: secretId }));

      const secretString = result && result.SecretString;
      if (!secretString) return;

      let parsed;
      try {
        parsed = JSON.parse(secretString);
      } catch (_e) {
        return;
      }

      if (parsed && typeof parsed === 'object') {
        for (const [key, value] of Object.entries(parsed)) {
          if (typeof value === 'undefined') continue;
          process.env[key] = String(value);
        }
      }
    } catch (_e) {
      // never throw on cold start
    }
  })();

  return secretsInitPromise;
}

function getExpressApp() {
  const mod = require('../dist/index');
  return mod.expressApp || (mod.default && mod.default.app) || mod;
}

const handler = async (event, context) => {
  await loadSecretsOnce();
  const app = getExpressApp();
  const wrapped = serverlessHttp(app);
  return wrapped(event, context);
};

module.exports = { handler };
