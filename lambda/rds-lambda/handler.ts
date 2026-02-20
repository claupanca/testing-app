import { APIGatewayEvent, Context } from "aws-lambda";
import { prisma } from "../shared/prisma";
import { users } from "../../generated/prisma/client";


export const handler = async (event: APIGatewayEvent, context: Context) => {
    // console.log('event', event);
    // console.log('context', context);

    const eventBody = JSON.parse(event.body || '{}');
    console.log(eventBody.email, eventBody.name)

    let allUsers: users[] = [];


    async function main() {
        // Create a new user with a post
        const user = await prisma.users.create({
            data: {
                name: eventBody.name,
                email: eventBody.email,
            },

        });
        console.log("Created user:", user);

        // Fetch all users with their posts
        allUsers = await prisma.users.findMany({});
        console.log("All users:", JSON.stringify(allUsers, null, 2));
    }

    main()
        .then(async () => {
            await prisma.$disconnect();
        })
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });

    return {
        statusCode: 200,
        body: allUsers
    }
}