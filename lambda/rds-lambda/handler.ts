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
    // }
    // try {

    //     main()
    //         .then(async () => {
    //             await prisma.$disconnect();
    //         })
    //         .catch(async (e) => {
    //             console.error(e);
    //             await prisma.$disconnect();
    //             process.exit(1);
    //         });

    //     return {
    //         statusCode: 200,
    //         body: allUsers
    //     }
    // }
    // catch (e) {
    //     console.log('Error', e)

    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({ error: e })
    //     }
    // }

}