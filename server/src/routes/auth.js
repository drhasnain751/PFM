const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { readDB, writeDB } = require('../db');

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const db = readDB();
    const userExists = db.users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword
    };
    
    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message, error: error.stack });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = readDB();
    const user = db.users.find(u => u.email === email);
    
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

router.patch('/profile', upload.single('avatar'), async (req, res) => {
  const { name, preferences } = req.body;
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    
    const db = readDB();
    const userIndex = db.users.findIndex(u => u._id === decoded.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) db.users[userIndex].name = name;
    if (preferences) {
        db.users[userIndex].preferences = typeof preferences === 'string' 
            ? JSON.parse(preferences) 
            : preferences;
    }
    
    if (req.file) {
      db.users[userIndex].avatar = `/uploads/${req.file.filename}`;
    } else if (req.body.avatarUrl) {
      db.users[userIndex].avatar = req.body.avatarUrl;
    }
    
    writeDB(db);
    
    res.json({
      _id: db.users[userIndex]._id,
      name: db.users[userIndex].name,
      email: db.users[userIndex].email,
      avatar: db.users[userIndex].avatar,
      preferences: db.users[userIndex].preferences,
      token: token
    });
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
});

router.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    
    const db = readDB();
    const userIndex = db.users.findIndex(u => u._id === decoded.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, db.users[userIndex].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }
    
    const salt = await bcrypt.genSalt(10);
    db.users[userIndex].password = await bcrypt.hash(newPassword, salt);
    
    writeDB(db);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
});

module.exports = router;
