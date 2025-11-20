const Parent = require("../models/Parent");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ---------------- Register Parent (Admin only) ----------------
const registerParent = async (req, res) => {
    try {
        const { name, email, phone, relation, password, children } = req.body;
        if (!name || !email || !relation || !password)
            return res.status(400).json({ message: "Name, email, relation, and password required" });

        const existing = await Parent.findOne({ email });
        if (existing) return res.status(400).json({ message: "Parent already exists" });

        const hashed = await bcrypt.hash(password, 10);

        let validChildren = [];
        if (children && children.length) {
            validChildren = await Student.find({ _id: { $in: children } });
        }

        const parent = await Parent.create({
            name,
            email,
            phone,
            relation,
            password: hashed,
            children: validChildren.map(c => c._id)
        });

        res.status(201).json({ message: "Parent registered successfully", parent });
    } catch (error) {
        console.error("registerParent error:", error);
        res.status(500).json({ message: error.message });
    }
};

// ---------------- Parent Login ----------------
const loginParent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const parent = await Parent.findOne({ email });
        if (!parent) return res.status(404).json({ message: "Parent not found" });

        const isMatch = await bcrypt.compare(password, parent.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: parent._id, role: "parent" }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful", token, parent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ---------------- Get Parent Children ----------------
const getParentChildren = async (req, res) => {
    try {
        const parentId = req.params.parentId;
        const parent = await Parent.findById(parentId).populate("children");
        if (!parent) return res.status(404).json({ message: "Parent not found" });

        res.json(parent.children);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ---------------- Get Child Dashboard ----------------
const getChildDashboard = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerParent, loginParent, getParentChildren, getChildDashboard };
