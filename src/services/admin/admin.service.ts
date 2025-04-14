import User, { UserRole, IUser } from '../../models/user.model';

export class AdminService{

    static async createSubAdmin(userData: Partial<IUser>): Promise<IUser> {
        const subAdmin = await User.create({
            ...userData,
            role: UserRole.SUB_ADMIN
        });

        return subAdmin;
    }

    static async getSubAdmins(): Promise<IUser[]> {
        return await User.find({});
    }

    static async getSubAdminById(id: string): Promise<IUser | null>{
        return await User.findById(id);
    }

    static async getSubAdminByEmail(email: string): Promise<IUser | null>{
        return await User.findOne({email});
    }

    static async updateSubAdmin(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, {new: true});
    }

    static async deleteSubAdmin(id: string): Promise<IUser | null>{
        return await User.findByIdAndDelete(id);
    }
}

