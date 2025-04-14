import bcrypt from "bcryptjs";
import User, { UserRole } from '../../models/user.model';
import dotenv from 'dotenv';


export class AuthService {

    static async registerSuperAdmin() {
        const existingSuperAdmin = await User.findOne({role: UserRole.SUPER_ADMIN});

        if(existingSuperAdmin){
            return existingSuperAdmin;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("HelloMotoo", salt);

        const superAdmin = await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN
        })

        return superAdmin;
    }


    static async login(email: string, password: string){

        const user = await User.findOne({email});
        if(!user){
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return null;
        }
        return user;
    }
}
