import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import prisma from '../prismaClient.js';

const router = express.Router();

// Register a nnew user /api/auth/register
router.post('/register', async (req, res) => {
    const {username,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 9);

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        // First todo item for the new user
        const defaultTodo = `HELLO :) Add your first todo!`;
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        });

        // Create a token
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'});
        console.log("token created")
        res.json({token})
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }

})

// Login an existing user /api/auth/login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

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
