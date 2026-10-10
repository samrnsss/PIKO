const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        dueDate: {
            type: String,
            default: ""
        },
        completed: {
            type: Boolean,
            default: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);