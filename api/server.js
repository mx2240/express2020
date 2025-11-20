const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db");

// Routes
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const feeRoutes = require("./routes/feeRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const transportRoutes = require("./routes/transportRoutes");
const driverRoutes = require("./routes/driverRoutes");
const busAttendanceRoutes = require("./routes/busAttendanceRoutes");
const parentRoutes = require("./routes/parentRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminSettingsRoutes = require("./routes/adminSettingsRoutes");
const adminProfileRoutes = require("./routes/adminProfileRoutes");
const adminStudentRoutes = require("./routes/adminStudentRoutes");
const userRoutes = require("./routes/UserRoutes");


dotenv.config();
connectDB();

const app = express();

// ===========================
// Middleware
// ===========================
app.use(cors({

    origin: "https://my-frontend-brown-eta.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true







}));
app.use(express.json());

// ===========================
// API Routes
// ===========================
app.use("/api", enrollmentRoutes);
app.use("/api", courseRoutes);
app.use("/api", studentRoutes);
app.use("/api", adminRoutes);
app.use("/api", gradeRoutes);
app.use("/api", announcementRoutes);
app.use("/api", inquiryRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", feeRoutes);
app.use("/api", attendanceRoutes); // General attendance
app.use("/api", busAttendanceRoutes); // Bus attendance
app.use("/api", timetableRoutes);
app.use("/api", libraryRoutes);
app.use("/api", transportRoutes);
app.use("/api", driverRoutes);
app.use("/api", hostelRoutes);
app.use("/api", parentRoutes); // Parent routes
app.use("/api", reportRoutes);
app.use("/api", notificationRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", adminSettingsRoutes);
app.use("/api", adminProfileRoutes);
app.use("/api", adminStudentRoutes);
app.use("/api", userRoutes);

// Auth routes (login/register)
// app.use("/api/auth", authRoutes);
app.use("/api", require("./routes/authRoutes"));


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
