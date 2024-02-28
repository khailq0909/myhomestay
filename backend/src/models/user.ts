import mongoose from 'mongoose';


export type UserType ={
    _id: string;
    email: string;
    passWord: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
}
const userSchema = new mongoose.Schema({
    email :{type: String, require: true, unique: true},
    passWord :{type: String, require: true},
    firstName :{type: String, require: true},
    lastName :{type: String, require: true},
    phoneNumber: {type: Number, require: true}
})

const User = mongoose.model<UserType>("User", userSchema);

export default User;