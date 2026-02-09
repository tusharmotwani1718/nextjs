"use server";
import { dbConnect } from "../lib/db/dbConnect";
import Contact from "../models/conatct.model.js";


export async function createContact(formData) {
    try {
        await dbConnect();
        const email = formData.get("email");
        const subject = formData.get("title");
        const message = formData.get("message");

        if (!email || !subject) {
            return {
                success: false,
                message: "Missing required fields"
            }
        }

        const contact = await Contact.create({
            title: subject.trim(),
            description: message.trim(),
            user_email: email.trim()
        })

        return {
            success: true,
            message: "Message sent successfully!",
            data: contact._id.toString()
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