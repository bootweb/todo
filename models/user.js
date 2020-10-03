import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	date: { type: Date, default: () => new Date() },
	created_date: { type: String, required: true },
	todo_bucket_name: { type: String, default: 'Bucket Name' },
	todo_list : { type: Array }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);