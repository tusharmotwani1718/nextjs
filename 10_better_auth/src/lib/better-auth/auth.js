import {betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_URI);
const db = client.db();


export const auth = betterAuth({
    database: (db, {
        client
    }),
    user: {
        additionalFields: {
            isSubscribed: {
                type: Boolean,
                required: true,
                defaultValue: false,
                input: false
            }
        }
    },
    emailAndPassword: {
        enabled: true
    }
})