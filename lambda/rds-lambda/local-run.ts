import dotenv from 'dotenv';
dotenv.config();

import { handler } from './handler';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const run = async () => {
    console.log('--- STARTING LOCAL TEST ---');

    // const mockEvent: Partial<APIGatewayRequestAuthorizerEventV2> = {
    //     headers: {
    //         'authorization': process.env.TEST_TOKEN ? `Bearer ${process.env.TEST_TOKEN}` : 'Bearer mock-token',
    //     },

    // };

    const mockContext = {} as Context;
    const mockEvent = {
        body: {
            name: "Test Clau 2",
            email: "claudiu2@prisma.io",
        },
    } as unknown as APIGatewayProxyEvent;

    try {
        console.time('Handler Execution');
        const result = await handler(mockEvent, mockContext);
        console.timeEnd('Handler Execution');

        console.log('--- RESULT ---');
        console.dir(result, { depth: null });

    } catch (error) {
        console.error('--- ERROR ---');
        console.error(error);
    }
};

run();
