import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 👇 THIS is the important line
const Note =
  mongoose.models.Note || mongoose.model("Note", NotesSchema);

export default Note;
