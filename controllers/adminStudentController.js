// controllers/adminStudentController.js
const Student = require("../models/Student");

// paginated: GET /api/admin/students
exports.listStudents = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;
        const query = {};
        if (search) query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];

        const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
        const [students, total] = await Promise.all([
            Student.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
            Student.countDocuments(query)
        ]);
        res.json({ students, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
    } catch (err) {
        console.error("listStudents error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// flat array for dropdown: GET /api/admin/students/all
exports.listAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}, "name email").sort({ name: 1 }).lean();
        res.json(students);
    } catch (err) {
        console.error("listAllStudents error:", err);
        res.status(500).json({ message: "Failed to load students", error: err.message });
    }
};

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).lean();
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (err) {
        console.error("getStudent error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { name, email, studentClass, phone } = req.body;
        const existing = await Student.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already taken" });
        const student = await Student.create({ name, email, studentClass, phone });
        res.status(201).json({ message: "Student created", student });
    } catch (err) {
        console.error("createStudent error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { name, email, studentClass, phone } = req.body;
        const { id } = req.params;
        const other = await Student.findOne({ email, _id: { $ne: id } });
        if (other) return res.status(400).json({ message: "Email already in use" });
        const updated = await Student.findByIdAndUpdate(id, { name, email, studentClass, phone }, { new: true, runValidators: true }).lean();
        if (!updated) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student updated", student: updated });
    } catch (err) {
        console.error("updateStudent error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Student.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted" });
    } catch (err) {
        console.error("deleteStudent error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
