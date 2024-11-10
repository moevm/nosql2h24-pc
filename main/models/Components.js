import mongoose from 'mongoose';

const ComponentsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
	main_properties: {
		type: Array,
		required: true,
	},
	other_properties: {
		type: Array,
		required: true,
	}
}, {
	timestamps: true
});

export default mongoose.model('Components', ComponentsSchema);