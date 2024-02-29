import Room from '../models/room';
import {Request, Response, NextFunction} from 'express';
import {createError} from '../utils/error';

export const createRoom = async (req:Request, res: Response, next:NextFunction) =>{
    const newRoom = new Room(req.body);
    try{
        const saveRoom = await newRoom.save();
        res.status(200).json(saveRoom);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const updateRoom = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updateRoom);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const deleteRoom = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Room has been deleted"});

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const getRoom = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const getAllRoom = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}