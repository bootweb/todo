const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

const oneMonth = 1000 * 60 * 60 * 24 * 31; // 31 Days

export default {
	mongodbUri: 'mongodb+srv://todoUser:todoUser12@cluster0.wnukx.mongodb.net/todo?retryWrites=true&w=majority',
	port: env.PORT || 4000,
	host: env.HOST || '0.0.0.0',
	sess_name: 'sid',
	sess_secret: 'myToDoApp/12!',
	sess_lifetime: oneMonth,
	get serverUrl() {
		return `http://${this.env.host}:${this.env.port}`;
	}
};