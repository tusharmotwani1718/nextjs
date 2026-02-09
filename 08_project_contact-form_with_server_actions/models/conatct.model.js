import mongoose, {Schema} from "mongoose";

const ContactSchema = new Schema({
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    user_email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;