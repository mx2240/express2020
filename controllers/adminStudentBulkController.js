const fs = require("fs");
const path = require("path");
const csv = require("csv-parse");
const Student = require("../models/Student");

// helper to parse CSV file
exports.bulkUpload = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "CSV file required" });

        const filePath = req.file.path;
        const records = [];
        const parser = fs.createReadStream(filePath).pipe(csv.parse({ columns: true, trim: true }));

        for await (const record of parser) {
            // expected columns: name,email,studentClass,phone
            records.push({
                name: record.name || record.fullName || record.FullName || "",
                email: (record.email || "").toLowerCase(),
                studentClass: record.studentClass || record.class || "",
                phone: record.phone || record.Phone || ""
            });
        }

        // basic de-duplication by email
        const emails = records.map(r => r.email).filter(Boolean);
        const existing = await Student.find({ email: { $in: emails } }).select("email");
        const existingEmails = new Set(existing.map(e => e.email));

        const toInsert = records.filter(r => r.email && !existingEmails.has(r.email));

        if (toInsert.length === 0) {
            fs.unlinkSync(filePath);
            return res.json({ message: "No new students to add", inserted: 0 });
        }

        const inserted = await Student.insertMany(toInsert, { ordered: false });
        fs.unlinkSync(filePath);
        res.json({ message: "Bulk upload complete", inserted: inserted.length });
    } catch (err) {
        console.error("bulkUpload error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
