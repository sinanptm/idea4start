export const MONGO_URI = process.env.MONGO_URI;
export const APP_URL = process.env.APP_URL;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

