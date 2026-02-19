import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION || 'eu-north-1',
});

let cachedSecret: string | null = null;

export const fetchPublicKeySecret = async (): Promise<string | null> => {
  if (cachedSecret) {
    return cachedSecret;
  }

  try {
    const secretId = process.env.secretId || 'PUBLIC_TOKEN_SECRET';
    // const secretId = process.env.secretId;
    const command = new GetSecretValueCommand({ SecretId: secretId });
    const response = await client.send(command);

    if (response.SecretString) {
      // Assuming the secret is stored as a JSON string with a key 'PUBLIC_TOKEN_KEY'
      // Adjust this parsing logic if your secret is just the raw key string
      try {
        console.log('secretString', response.SecretString)
        const parsed = JSON.parse(response.SecretString);
        cachedSecret = parsed.PUBLIC_TOKEN_KEY || response.SecretString;
      } catch {
        // If it's not JSON, treat the whole string as the key
        cachedSecret = response.SecretString;
      }
    }

    return cachedSecret;
  } catch (error) {
    console.error('Error fetching secret:', error);
    throw error;
  }
};
