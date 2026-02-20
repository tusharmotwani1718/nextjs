import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_URI);
const db = client.db();

console.log("ENV CHECK →", {
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NODE_ENV: process.env.NODE_ENV,
});



export const auth = betterAuth({
  trustProxy: true,

  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    "http://localhost:3000"
  ],

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      isSubscribed: {
        type: Boolean,
        required: true,
        defaultValue: false,
        input: false,
      },
      phoneNumber: {
        type: String,
        required: true,
        input: true,
      },
    },
  },
});
