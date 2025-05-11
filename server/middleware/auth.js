import jwt from "jsonwebtoken"

const authenticateJWT = (req,res,next) =>{
    const token = req.headers['authorization'];

    if(!token) return res.status(401).json({ message: 'Access Denied'});

    jwt.verify(token,process.env.JWT_SECRET, (err,user) =>{
        if(err) return res.status(403).json({ message: 'Invalid Token'});

        req.user = user; // Attach the user data to the request object
        next(); // Proceed to the next middleware or route handler
    })
}

export default authenticateJWT