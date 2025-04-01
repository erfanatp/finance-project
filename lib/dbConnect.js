import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("mongodb uri not found!");
}

export const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("db connection success!");
    } catch (e) {
        console.error("db connection error", e);
    }
}
