import mongoose from "mongoose";

const Mongo_db_uri = process.env.MONGODB_CONNECTION_URI;

// console.log('uri: ' + Mongo_db_uri);

let isConnected = false;


export async function dbConnect() {

    if(isConnected) {
        console.log("Already connected to db...✔️✔️✔️");
        return;
    }

    try {
        const db = await mongoose.connect(Mongo_db_uri);
        isConnected = db.connections[0].readyState === 1;


        console.log('connected to db successfully...✅✅✅')

    } catch (error) {
        console.error(`error connecting db: ${JSON.stringify(error)}`);
        throw error;
    }
}

dbConnect();