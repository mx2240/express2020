// // config/db.js
// const mongoose = require("mongoose");

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//     if (cached.conn) return cached.conn;

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         };
//         cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
//             return mongoose;
//         });
//     }

//     cached.conn = await cached.promise;
//     return cached.conn;
// }

// module.exports = connectDB;




const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // no options needed
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

