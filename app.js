// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// ----------
// Middleware
// ----------
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ----------
// Connect MongoDB (singleton for serverless)
// ----------
let cached = global.mongo;
if (!cached) cached = global.mongo = { conn: null, promise: null };

async function initDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = connectDB(process.env.MONGO_URI)
            .then(conn => {
                cached.conn = conn;
                return conn;
            })
            .catch(err => {
                console.error("MongoDB connection error:", err);
                throw err;
            });
    }
    return cached.promise;
}
initDB().catch(err => console.error(err));

// ----------
// Routes
// ----------
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/grades", require("./routes/gradeRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/bus-attendance", require("./routes/busAttendanceRoutes"));
app.use("/api/timetable", require("./routes/timetableRoutes"));
app.use("/api/library", require("./routes/libraryRoutes"));
app.use("/api/transport", require("./routes/transportRoutes"));
app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/hostel", require("./routes/hostelRoutes"));
app.use("/api/parents", require("./routes/parentRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/admin-settings", require("./routes/adminSettingsRoutes"));
app.use("/api/admin-profile", require("./routes/adminProfileRoutes"));
app.use("/api/admin-students", require("./routes/adminStudentRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ----------
// Test Route
// ----------
app.get("/", (req, res) => {
    res.json({ message: "✅ School API is running on Vercel" });
});

// ----------
// Export for Vercel
// ----------
module.exports = app;
