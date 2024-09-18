import mongoose from "mongoose";

const HelloWorldSchema = new mongoose.Schema({
	msg: {
		type: String,
		required: true
	}
})

export default mongoose.model('HelloWorld', HelloWorldSchema);