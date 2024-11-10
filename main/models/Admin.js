import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
	login: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	}
}, { timestamps: true });

export default mongoose.model("Admin", AdminSchema);