import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

// Register a nnew user /api/auth/register
router.post('/register', (req, res) => {
    console.log(req.body)
    const {username,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 9);

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        // First todo item for the new user
        const defaultTodo = `HELLO :) Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // Create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});
        console.log("token created")
        res.json({token})
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }

})

// Login an existing user /api/auth/login
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username)
    try {
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
        const user = getUser.get(username);

        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        console.log(user);
        const isPasswordValid = bcrypt.compareSync(password,user.password)
        if (!isPasswordValid) {
            return res.status(401).send({message: "Invalid password"});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({token})
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
})

export default router;
