import Note from "../../../models/note.model";
import { dbConnect } from "../../db/dbConnect";

export async function FetchNotes() {
    try {
        await dbConnect();
    
        const notes = await Note.find().sort({ createdAt: -1 }).lean();
        return notes;
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        throw new Error("Unable to load notes. Please try again.");
    }
}