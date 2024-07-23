import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMongoConnection = async () => {
    try {
        const user = env('MONGODB_USER');
        const pwd = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');

        await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}?retryWrites=true&w=majority`);
        console.log("MongoDB connection established successfully");
    } catch (error) {
        throw new Error(`Error while setting up mongo connection: ${error.message}`);
    }
};
