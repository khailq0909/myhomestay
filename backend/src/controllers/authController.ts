import User from '../models/user';
import {Response, Request, NextFunction} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import {createError} from '../utils/error';

export const register = async (req: Request, res: Response) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const newUser = new User({
        ...req.body,
        password: hash,
        });
        await newUser.save();
        res.status(200).send("Register succesfully.");
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}
export const login = async (req: Request, res: Response, next:NextFunction) =>{
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user){
            return next(createError("401", "Invalid User"))
        }
        const isPasswordCorrect = await bcrypt.compare( req.body.password, user!.password );
        if (!isPasswordCorrect){
            return next(createError("401", "Invalid Password"))
        }
        const token = jwt.sign(
        { id: user!._id, isAdmin: user!.isAdmin }, process.env.JWT_SECRET_KEY as string );
    
        // const { password, isAdmin, ...otherDetails } = user!._doc;
        res .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({userId: user!._id});
    } catch (err) {
        return next(createError("401", "User not found"))
    }
}