const express = require("express");
const router = express.Router();
const db = require('../config/db');

// POST route for signup Admin
router.post('/signup', (req, res) => {
    const { username, name, password } = req.body;

    const queryCheck = 'SELECT * FROM admin WHERE username = ?';
    db.query(queryCheck, [username], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            const queryInsert = 'INSERT INTO admin (username, name, password) VALUES (?, ?, ?)';
            db.query(queryInsert, [username, name, password], (err) => {
                if (err) throw err;
                // Successfully created the user
                res.json({ success: true, message: 'Admin created successfully' });
            });
        } else {
            // User already exists
            res.json({ success: false, message: 'User already exists' });
        }
    });
});


// POST route to validate Admin login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

router.get("/AdminDetails",(req,res)=>{
    const query = 'SELECT * FROM admin';
    db.query(query,(err, result) => {
        if (err) throw err;
        if (result.length < 0) {
            res.json({ success: true, message: 'No data available' });
        } else {
            res.json(result)
        }
    });
})

// You can add more admin routes here

module.exports = router;
