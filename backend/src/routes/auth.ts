import express, {Request, Response} from 'express';
import { check, validationResult } from "express-validator";
import User from '../models/user';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("passWord", "PassWord with more than 6 and less 20 characters is required").isLength({min: 6, max: 20})
], async(req: Request, res: Response)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }

    const {email, passWord} = req.body;

    try{
        const user = await User.findOne({email});
        if(!email){
            return res.status(400).json({message: "Invalid Credentials"});

        }
        const isMatch = await bcrypt.compare(passWord, user.passWord);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
});