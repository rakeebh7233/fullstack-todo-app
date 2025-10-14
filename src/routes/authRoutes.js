import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

// Register a nnew user /api/auth/register
router.post('/register', (req, res) => {
    const {username,password} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 9);

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        // First todo item for the new user
        const defaultTodo = `HELLO :) Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, text) VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // Create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});
    } catch (err) {
        console.log(err.username);
        res.sendStatus(503);
    }

    res.sendStatus(201); 
})

router.post('/login', (req, res) => {

})

export default router;
