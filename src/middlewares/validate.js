import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

export const validateRegister = [
  body("user_name").notEmpty().withMessage("Username required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

//validate Token
export const authenticateToken=(req,res,next)=>{
     const authHeader=req.headers['authorization'];
     const token=authHeader && authHeader.split(' ')[1]; //Bearer Token

     if(!token) return res.status(401).json({error:'Unauthorized'});
     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
          if(err) return res.status(403).json({error:'Invalid token'});
          req.user=user;
          next();
     })
}