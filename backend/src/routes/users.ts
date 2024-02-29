import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} from '../controllers/userController';

const router = express.Router();

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);
export default router;