const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const enrollmentRoutes = require("./api/routes/enrollmentRoutes");
const courseRoutes = require("./api/routes/courseRoutes");
const studentRoutes = require("./api/routes/studentRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const gradeRoutes = require("./api/routes/gradeRoutes");
const announcementRoutes = require("./api/routes/announcementRoutes");
const inquiryRoutes = require("./api/routes/inquiryRoutes");
const feeRoutes = require("./api/routes/feeRoutes");

const attendanceRoutes = require("./api/routes/attendanceRoutes");
const timetableRoutes = require("./api/routes/timetableRoutes");
const libraryRoutes = require("./api/routes/libraryRoutes");
const hostelRoutes = require("./api/routes/hostelRoutes");
const transportRoutes = require("./api/routes/transportRoutes");
const driverRoutes = require("./api/routes/driverRoutes");
const busAttendanceRoutes = require("./api/routes/busAttendanceRoutes");
const parentRoutes = require("./api/routes/parentRoutes");
const authRoutes = require("./api/routes/authRoutes");
const reportRoutes = require("./api/routes/reportRoutes");
const notificationRoutes = require("./api/routes/notificationRoutes");
const dashboardRoutes = require("./api/routes/dashboardRoutes");
const adminSettingsRoutes = require("./api/routes/adminSettingsRoutes");
const adminProfileRoutes = require("./api/routes/adminProfileRoutes");
const adminStudentRoutes = require("./api/routes/adminStudentRoutes");


dotenv.config();
connectDB();

const app = express();

// ===========================
// Middleware
// ===========================
app.use(cors());
app.use(express.json());

// ===========================
// API Routes
// ===========================
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/attendance", attendanceRoutes); // General attendance
app.use("/api/attendance/bus", busAttendanceRoutes); // Bus attendance
app.use("/api/timetable", timetableRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/parents", parentRoutes); // Parent routes
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/admin/profile", adminProfileRoutes);
app.use("/api/admin/students", adminStudentRoutes);

// Auth routes (login/register)
// app.use("/api/auth", authRoutes);
app.use("/api/auth", require("./routes/authRoutes"));


// ===========================
// Root
// ===========================
app.get("/", (req, res) => {
    res.send("✅ School API is running...");
});

// ===========================
// Start server
// ===========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
