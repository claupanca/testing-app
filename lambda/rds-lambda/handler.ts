import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent, context: undefined) => {
    console.log('event', event);
    console.log('context', context);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from RDS Lambda!'),
    };
    return response
}