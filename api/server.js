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
app.use("/", enrollmentRoutes);
app.use("/", courseRoutes);
app.use("/", studentRoutes);
app.use("/", adminRoutes);
app.use("/", gradeRoutes);
app.use("/", announcementRoutes);
app.use("/", inquiryRoutes);
app.use("/", dashboardRoutes);
app.use("/", feeRoutes);
app.use("/", attendanceRoutes); // General attendance
app.use("/", busAttendanceRoutes); // Bus attendance
app.use("/", timetableRoutes);
app.use("/", libraryRoutes);
app.use("/", transportRoutes);
app.use("/", driverRoutes);
app.use("/", hostelRoutes);
app.use("/", parentRoutes); // Parent routes
app.use("/", reportRoutes);
app.use("/", notificationRoutes);
app.use("/", dashboardRoutes);
app.use("/", adminSettingsRoutes);
app.use("/", adminProfileRoutes);
app.use("/", adminStudentRoutes);
app.use("/", userRoutes);

// Auth routes (login/register)
// app.use("/api/auth", authRoutes);
app.use("/", require("./routes/authRoutes"));


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
