import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, requird: true},
    email: { type: String, unique: true, required: true },
    password: {type: String, required: true}
}, {
    timestamps: true,
    strict: true,  // This will throw an error for extra fields
    validateBeforeSave: true  // Validate before saving
});

userSchema.methods.hashedPassword = async function(password){
    return await bcrypt.hash(password, 12);
}

userSchema.methods.comparePassword = async function(inputPassword, hashedPassword){
    return await bcrypt.compare(inputPassword, hashedPassword);
}

mongoose.model("User", userSchema);