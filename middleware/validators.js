const { body, validationResult } = require("express-validator");

exports.validateStudent = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    // phone optional but if present check length
    body("phone").optional().isLength({ min: 6 }).withMessage("Phone looks short"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return first error message and list for frontend-friendly response
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        next();
    }
];
