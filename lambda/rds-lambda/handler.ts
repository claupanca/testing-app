import { APIGatewayEvent, Context } from "aws-lambda";
import { prisma } from "../shared/prisma";
import { users } from "../../generated/prisma/client";


export const handler = async (event: APIGatewayEvent, context: Context) => {
    // console.log('event', event.body);
    // console.log('event2', typeof event.body);
    // console.log('event3', JSON.parse(event.body || '{}'));
    // console.log('context', context);

    const eventBody = JSON.parse(event.body || '{}');
    console.log(eventBody.email, eventBody.name)

    let allUsers: users[] = [];

    // console.log('prisma',prisma)

    try {
        const user = await prisma.users.create({
            data: {
                name: eventBody?.name,
                email: eventBody?.email,
            },

        });
        console.log("Created user:", user);

        // Fetch all users with their posts
        allUsers = await prisma.users.findMany({});
        console.log("All users:", JSON.stringify(allUsers, null, 2));
    } catch (error) {
        console.error('Error creating user:', error);
    }


    // async function main() {
    //     // Create a new user with a post
    //     const user = await prisma.users.create({
    //         data: {
    //             name: eventBody?.name,
    //             email: eventBody?.email,
    //         },

    //     });
    //     console.log("Created user:", user);

    //     // Fetch all users with their posts
    //     allUsers = await prisma.users.findMany({});
    //     console.log("All users:", JSON.stringify(allUsers, null, 2));
    // } catch (error) {
    //     console.error('Error creating user:', error);
    // }


    async function main() {
        // Create a new user with a post
        const user = await prisma.users.create({
            data: {
                name: eventBody?.name,
                email: eventBody?.email,
            },

        });
        console.log("Created user:", user);

        // Fetch all users with their posts
        allUsers = await prisma.users.findMany({});
        console.log("All users:", JSON.stringify(allUsers, null, 2));
    }
    try {
        await main();
        await prisma.$disconnect();

        return {
            statusCode: 200,
            body: JSON.stringify(allUsers)
        };
    }
    catch (e) {
        console.error('Error', e);
        await prisma.$disconnect();

        return {
            statusCode: 500,
            body: JSON.stringify({ error: e })
        };
    }

}
```