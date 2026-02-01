import { NextResponse } from "next/server";
import Note from "../../../../../../models/note.model";


export async function DELETE(request, { params }) {
    try {
        const {id} = await params;
    
        // console.log(id);
    
    
        await Note.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Note deleted successfully",
        }, {status: 201})
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Error deleting note",
        }, {status: 500})
    }
}