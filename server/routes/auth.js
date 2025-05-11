import { PrismaClient } from '@prisma/client';
import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import authenticateJWT from "../middleware/auth.js"
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();
const prisma = new PrismaClient();

// Register
router.post('/register',async (req,res) => { 
    const{username,password,role} = req.body
    try{
        const existing = await prisma.user.findUnique({where: {username}})
        if(existing) return res.status(400).json({message:'User already exists'})
        
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await prisma.user.create({
            data:{
                username,
                password:hashedPassword,
                role: role || 'USER',
            }
        })

        res.status(201).json({message:'User Created', user:{id:user.id,username: user.username}})

    }
    catch (e){
        res.status(500).json({message:'Registration Failed'})
    }
})

// Login
router.post('/login', async (req,res) => {
    const{username,password} = req.body;
    try {
        const user = await prisma.user.findUnique({where: {username}})
        if (!user) return res.status(400).json({message:'Invalid Credential'})
        
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) return res.status(400).json({message:'Invalid Credential'})

        const token = jwt.sign(
            {userId:user.id, username:user.username, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        
        res.json({token})
        
    } catch (e) {
        res.status(500).json({ message:'Login Failed'})
    }
})

// Protected Route
router.get('/profile', authenticateJWT, async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.user.userId},
            select: {id:true, username: true, role: true,createdAt:true}
        });

        res.json(user);
        
    } catch (error) {
        res.status(500).json({message: 'Could not fetch profile'})
    }
})

// Admin Route
router.get('/admin', authenticateJWT, authorizeRole('ADMIN'), (req,res) =>{
    res.json({ message:'Welcome Admin'});
});

export default router;