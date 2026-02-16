import mongoose, {Schema} from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 200
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Todo = mongoose.models.Todo || mongoose.model("Todo", Todo);