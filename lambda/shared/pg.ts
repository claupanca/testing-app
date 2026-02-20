import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Client } from 'pg'

const secretsClient = new SecretsManagerClient({ region: process.env.AWS_REGION || 'eu-north-1' });

let cachedClient: Client;

export const pg = async () => {

    if (!cachedClient) {
        const command = new GetSecretValueCommand({ SecretId: process.env.AWS_RDS_SECRET });
        const response = await secretsClient.send(command);

        const config = JSON.parse(response.SecretString || '');

        cachedClient = new Client(config);
        await cachedClient.connect();
    }

    return cachedClient;
}

