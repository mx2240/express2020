const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn; // reuse existing connection
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // add other mongoose options if needed
        };

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = connectDB;
