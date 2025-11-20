// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config();

// const app = express();

// // ----------
// // Connect DB only once
// // ----------
// let dbConnected = false;
// async function initDB() {
//     if (!dbConnected) {
//         await connectDB();
//         dbConnected = true;
//     }
// }
// initDB();

// // ----------
// // Middleware
// // ----------
// app.use(cors({
//     origin: "https://my-frontend-brown-eta.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// app.use(express.json());

// // ----------
// // Routes
// // ----------
// app.use("/api", require("./routes/enrollmentRoutes"));
// app.use("/api", require("./routes/courseRoutes"));
// app.use("/api", require("./routes/studentRoutes"));
// app.use("/api", require("./routes/adminRoutes"));
// app.use("/api", require("./routes/gradeRoutes"));
// app.use("/api", require("./routes/announcementRoutes"));
// app.use("/api", require("./routes/inquiryRoutes"));
// app.use("/api", require("./routes/dashboardRoutes"));
// app.use("/api", require("./routes/feeRoutes"));
// app.use("/api", require("./routes/attendanceRoutes"));
// app.use("/api", require("./routes/busAttendanceRoutes"));
// app.use("/api", require("./routes/timetableRoutes"));
// app.use("/api", require("./routes/libraryRoutes"));
// app.use("/api", require("./routes/transportRoutes"));
// app.use("/api", require("./routes/driverRoutes"));
// app.use("/api", require("./routes/hostelRoutes"));
// app.use("/api", require("./routes/parentRoutes"));
// app.use("/api", require("./routes/reportRoutes"));
// app.use("/api", require("./routes/notificationRoutes"));
// app.use("/api", require("./routes/adminSettingsRoutes"));
// app.use("/api", require("./routes/adminProfileRoutes"));
// app.use("/api", require("./routes/adminStudentRoutes"));
// app.use("/api", require("./routes/UserRoutes"));
// app.use("/api", require("./routes/authRoutes"));

// // ----------
// // Test Route
// // ----------
// app.get("/", (req, res) => {
//     res.json({ message: "School API is running on Vercel 🚀" });
// });

// // ----------
// // Export for Vercel
// // ----------
// module.exports = app;





const express = require("express");
const app = express();

app.get("/", (req, res) => res.json({ message: "Hello Vercel!" }));

module.exports = app;

