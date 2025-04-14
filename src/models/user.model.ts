import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    SUB_ADMIN = "SUB_ADMIN"
}

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}


const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: Object.values(UserRole), default: UserRole.SUB_ADMIN},
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});


export default mongoose.model<IUser>('User', UserSchema);