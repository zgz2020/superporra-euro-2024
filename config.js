import 'dotenv/config';

export const DATABASE_URL =
	process.env.DATABASE_URL ||
	'mongodb+srv://testUser:testPassword@cluster0.z4s3d.mongodb.net/dev?retryWrites=true&w=majority';
