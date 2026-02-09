"use server";
import { dbConnect } from "../lib/db/dbConnect";
import Contact from "../models/conatct.model.js";


export async function getContact() {
    try {
        await dbConnect();

        const contacts = await Contact.find().sort({ createdAt: -1 }).lean()

        return {
            success: true,
            message: "Messages fetched successfully!",
            data: contacts
        }

    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: error
        }
    }
}