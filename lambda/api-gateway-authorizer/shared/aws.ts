import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

export const fetchPublicKeySecret = async () => {
  try {
    const region = process.env.AWS_REGION || 'eu-north-1';
    const secretId = process.env.SECRET_ID || 'PUBLIC_TOKEN_SECRET';

    const client = new SecretsManagerClient({ region });
    const command = new GetSecretValueCommand({ SecretId: secretId });
    const response = await client.send(command);

    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Error fetching secret:', error);
    throw error;
  }
};
