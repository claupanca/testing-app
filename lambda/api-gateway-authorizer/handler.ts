import type {
  Context,
  APIGatewayAuthorizerResult,
  APIGatewayEvent,
} from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { fetchPublicKeySecret } from './shared/aws';

import dotenv from 'dotenv';
dotenv.config();

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<{ isAuthorized: boolean }> => {
  // console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  // console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  console.log('BRAND NEW UPLOADED');

  const headers = event.headers || {};
  const authHeader = headers['authorization'] || headers['Authorization'];
  console.log(`Authorization header: ${authHeader}`);
  const jwtToken = authHeader?.split(' ')[1] || '';
  console.log(`Extracted JWT token: ${jwtToken}`);

  const decoded = jwt.verify(jwtToken, 'my-secret-key');
  console.log('decoded', decoded);

  const secretKey = await fetchPublicKeySecret();
  console.log('secretKey here', secretKey);

  const secretString = JSON.parse(
    secretKey?.SecretString || ''
  ).PUBLIC_TOKEN_KEY;

  console.log('secretString', secretString);

  // const expiresIn = '3h';
  // const jwtToken = jwt.sign({ foo: 'hello world' }, 'my-secret-key', {
  //   expiresIn,
  //   algorithm: 'HS256',
  // });
  // console.log('jwtToken', jwtToken);
  // return { isAuthorized: true };

  if (decoded) {
    return { isAuthorized: true };
  } else {
    return { isAuthorized: false };
  }

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'hello world',
  //     //   jwtToken,
  //   }),
  // };
};
