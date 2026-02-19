import type {
  Context,
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEventV2,
} from "aws-lambda";
import jwt from "jsonwebtoken";
import { fetchPublicKeySecret } from "../shared/aws";

export const handler = async (
  event: Partial<APIGatewayRequestAuthorizerEventV2>,
  context: Context,
): Promise<{ isAuthorized: boolean }> => {
  try {
    const headers = event.headers || {};
    // Case-insensitive header lookup
    const authHeader = Object.keys(headers).find(
      (key) => key.toLowerCase() === "authorization",
    )
      ? headers[
      Object.keys(headers).find(
        (key) => key.toLowerCase() === "authorization",
      ) as string
      ]
      : undefined;

    if (!authHeader) {
      console.warn("No Authorization header found");
      return { isAuthorized: false };
    }

    console.log("authHeader", authHeader);

    const match = authHeader.match(/^Bearer\s+(.*)$/i);
    if (!match || !match[1]) {
      console.warn(
        'Invalid Authorization header format. Expected "Bearer <token>"',
      );
      return { isAuthorized: false };
    }

    const jwtToken = match[1];
    const publicKey = await fetchPublicKeySecret();

    if (!publicKey) {
      console.error("Failed to retrieve public key secret");
      // Fail secure implies returning false or throwing. throwing might cause 500.
      return { isAuthorized: false };
    }

    const decoded = jwt.verify(jwtToken, publicKey, {
      algorithms: ["HS256", "RS256"],
    });
    // Note: Ensure your algorithm matches what signed the token!
    // If using a Public Key (RS256), the second arg is the key.
    // If using a Secret (HS256), the second arg is the secret.

    if (decoded) {
      return { isAuthorized: true };
    }

    return { isAuthorized: false };
  } catch (error) {
    console.error("Authorization failed:", error);
    return { isAuthorized: false };
  }
};
