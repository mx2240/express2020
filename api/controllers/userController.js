const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { start } = require('repl');




// Registration And Login start

const register = async (req, res) => {

    const { username, email, password } = req.body;

    const existingUserName = await Users.findOne({ username });
    const existingUserEmail = await Users.findOne({ email });

    if ((existingUserName || existingUserEmail)) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const RegisterUser = new Users({ username, email, password: hashedPassword });
    const RegisteredUserSaved = await RegisterUser.save();

    if (RegisteredUserSaved) {

        res.status(201).json({ message: 'User registered successfully' });
    }
};
  


const login = async (req, res) => {

    const { email , password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
};

// Registration And Login End





// Uploading An Image Start

// Set path to 'public/uploads'
const uploadPath = path.join(__dirname, '../public', 'uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}



// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,uploadPath); // Uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// File filter (optional, e.g., only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Uploading An Image Ends





module.exports = { register, login, upload};