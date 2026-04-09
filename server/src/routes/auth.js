const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { readDB, writeDB } = require('../db');

const router = express.Router();

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

router.patch('/profile', async (req, res) => {
  const { name } = req.body;
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
    
    db.users[userIndex].name = name;
    writeDB(db);
    
    res.json({
      _id: db.users[userIndex]._id,
      name: db.users[userIndex].name,
      email: db.users[userIndex].email,
      token: token // return same token
    });
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
});

module.exports = router;
