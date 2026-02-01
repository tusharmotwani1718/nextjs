import { NextResponse } from "next/server";
import Note from "../../../../../../models/note.model";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    note.isCompleted = !note.isCompleted;
    await note.save();

    return NextResponse.json(
      { success: true, message: "Note updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error updating note" },
      { status: 500 }
    );
  }
}
