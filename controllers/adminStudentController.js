// controllers/adminStudentController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Student = require("../models/Student");

// -------------------------
// Paginated students
// GET /api/admin/students
// -------------------------
exports.listStudents = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
        const [students, total] = await Promise.all([
            Student.find(query)
                .populate("user", "name email role") // populate user info
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            Student.countDocuments(query),
        ]);

        res.json({
            ok: true,
            students,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        });
    } catch (err) {
        console.error("listStudents error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};

// -------------------------
// Flat array for dropdowns
// GET /api/admin/students/all
// -------------------------
exports.listAllStudents = async (req, res) => {
    try {
        const students = await Student.find({})
            .populate("user", "name email")
            .sort({ name: 1 })
            .lean();

        res.json({ ok: true, students });
    } catch (err) {
        console.error("listAllStudents error:", err);
        res.status(500).json({ ok: false, message: "Failed to load students", error: err.message });
    }
};

// -------------------------
// Get single student
// GET /api/admin/students/:id
// -------------------------
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate("user", "name email role")
            .lean();

        if (!student) return res.status(404).json({ ok: false, message: "Student not found" });
        res.json({ ok: true, student });
    } catch (err) {
        console.error("getStudent error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};

// -------------------------
// Create student
// POST /api/admin/students
// -------------------------
exports.createStudent = async (req, res) => {
    try {
        const { name, email, password, studentClass, phone } = req.body;

        // Find or create User
        let user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password || "123456", 10);
            user = await User.create({ name, email, password: hashedPassword, role: "student" });
        }

        // Check if student already linked
        let student = await Student.findOne({ user: user._id });
        if (student) {
            return res.status(200).json({
                ok: true,
                message: "Student already exists",
                student,
            });
        }

        // Create new student
        student = await Student.create({ user: user._id, studentClass, phone, name, email });
        res.status(201).json({ ok: true, message: "Student created", student });
    } catch (err) {
        console.error("createStudent error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};


// -------------------------
// Update student
// PUT /api/admin/students/:id
// -------------------------
exports.updateStudent = async (req, res) => {
    try {
        const { name, email, studentClass, phone } = req.body;
        const { id } = req.params;

        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ ok: false, message: "Student not found" });

        // Check if email is already used by another user
        const otherUser = await User.findOne({ email, _id: { $ne: student.user } });
        if (otherUser) return res.status(400).json({ ok: false, message: "Email already in use" });

        // Update user info
        await User.findByIdAndUpdate(student.user, { name, email });

        // Update student info
        student.studentClass = studentClass || student.studentClass;
        student.phone = phone || student.phone;
        await student.save();

        res.json({ ok: true, message: "Student updated", student });
    } catch (err) {
        console.error("updateStudent error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};

// -------------------------
// Delete student
// DELETE /api/admin/students/:id
// -------------------------
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ ok: false, message: "Student not found" });

        // Remove linked user if needed
        await User.findByIdAndDelete(student.user);
        await Student.findByIdAndDelete(id);

        res.json({ ok: true, message: "Student deleted" });
    } catch (err) {
        console.error("deleteStudent error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};






