"use server";
import { dbConnect } from "../lib/db/dbConnect";
import Contact from "../models/conatct.model.js";
import { revalidatePath } from "next/cache";

export async function updateContactStatus(contactId, isRead) {
  try {
    await dbConnect();

    await Contact.findByIdAndUpdate(contactId, { isRead });

    // revalidate the contacts page
    revalidatePath("/contacts");

    return {
      success: true,
      message: "Contact updated successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message || "Failed to update contact",
    };
  }
}
