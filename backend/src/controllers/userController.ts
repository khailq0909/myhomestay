import User from '../models/user';
import {Response, Request, NextFunction} from 'express';
import {createError} from '../utils/error';

export const updateUser = async (req: Request,res: Response, next: NextFunction)=>{
try {
    const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(updatedUser);
} catch (err) {
    return next(createError("500", "Something went wrong"));
}
}
export const deleteUser = async (req: Request,res: Response, next: NextFunction)=>{
try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
} catch (err) {
    return next(createError("500", "Something went wrong"));
}
}
export const getUser = async (req: Request,res: Response, next: NextFunction)=>{
try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
} catch (err) {
    return next(createError("500", "Something went wrong"));
}
}
export const getUsers = async (req:Request,res: Response, next: NextFunction)=>{
try {
    const users = await User.find();
    res.status(200).json(users);
} catch (err) {
    return next(createError("500", "Something went wrong"));
}
}