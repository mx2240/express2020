const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// ----------
// Connect DB only once
// ----------
let dbConnected = false;
async function initDB() {
    if (!dbConnected) {
        await connectDB();
        dbConnected = true;
    }
}
initDB();

// ----------
// Middleware
// ----------
app.use(cors({
    origin: "https://my-frontend-brown-eta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ----------
// Routes
// ----------
app.use("/api", require("./api/routes/enrollmentRoutes"));
app.use("/api", require("./api/routes/courseRoutes"));
app.use("/api", require("./api/routes/studentRoutes"));
app.use("/api", require("./api/routes/adminRoutes"));
app.use("/api", require("./api/routes/gradeRoutes"));
app.use("/api", require("./api/routes/announcementRoutes"));
app.use("/api", require("./api/routes/inquiryRoutes"));
app.use("/api", require("./api/routes/dashboardRoutes"));
app.use("/api", require("./api/routes/feeRoutes"));
app.use("/api", require("./api/routes/attendanceRoutes"));
app.use("/api", require("./api/routes/busAttendanceRoutes"));
app.use("/api", require("./api/routes/timetableRoutes"));
app.use("/api", require("./api/routes/libraryRoutes"));
app.use("/api", require("./api/routes/transportRoutes"));
app.use("/api", require("./api/routes/driverRoutes"));
app.use("/api", require("./api/routes/hostelRoutes"));
app.use("/api", require("./api/routes/parentRoutes"));
app.use("/api", require("./api/routes/reportRoutes"));
app.use("/api", require("./api/routes/notificationRoutes"));
app.use("/api", require("./api/routes/adminSettingsRoutes"));
app.use("/api", require("./api/routes/adminProfileRoutes"));
app.use("/api", require("./api/routes/adminStudentRoutes"));
app.use("/api", require("./api/routes/UserRoutes"));
app.use("/api", require("./api/routes/authRoutes"));

// ----------
// Test Route
// ----------
app.get("/", (req, res) => {
    res.json({ message: "School API is running on Vercel 🚀" });
});

// ----------
// Export for Vercel
// ----------
module.exports = app;
