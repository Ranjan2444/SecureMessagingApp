import { PrismaClient } from '@prisma/client';
import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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

export default router;