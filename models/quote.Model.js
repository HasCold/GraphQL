import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    by: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true,
    strict: true,  // This will throw an error for extra fields
    validateBeforeSave: true  // Validate before saving
})

mongoose.model("Quote", quoteSchema);

