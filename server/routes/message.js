import express from "express";
import { PrismaClient } from '@prisma/client';
import authenticateJWT from "../middleware/auth.js";


const router = express.Router();
const prisma = new PrismaClient();


// Send a message
router.post('/send', authenticateJWT,async(req,res) =>{

    const {receiverId,content} = req.body;
    const senderId = req.user.userId;

    try {

        const message = await prisma.message.create({
            data:{
                senderId,
                receiverId,
                content,
            },
        });

        res.status(201).json({message:'Message sent', data: message});
        
    } catch (err) {
        res.status(500).json({ message: 'Failed to send message' });
    }

})

// Get message for logged in user
router.get('/inbox', authenticateJWT, async(req,res) =>{
    const userId = req.user.userId;

    try {
        const message = await prisma.message.findMany({
            where:{
                receiverId: userId,
            },
            include:{
                sender: {select: { username: true }},
            },
            orderBy:{timestamp: 'desc'},
        })

        res.json(message);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
})

export default router;