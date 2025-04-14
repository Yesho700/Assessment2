import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { AdminService } from "../../services/admin/admin.service";

export class AdminController {
    
    static async createSubAdmin(request: Request, h: ResponseToolkit){
        const subAdmin = await AdminService.createSubAdmin(request.payload as any);
        return h.response(subAdmin).code(201);
    }


    static async getSubAdmins(request: Request, h: ResponseToolkit){
        const subAdmins = await AdminService.getSubAdmins();
        return h.response(subAdmins).code(200);
    }

    static async getSubAdmin(request: Request, h: ResponseToolkit){
        let subAdmin;

        if(request.params.id){
            subAdmin = await AdminService.getSubAdminById(request.params.id);
        }
        if(request.params.email){
            subAdmin = await AdminService.getSubAdminByEmail(request.params.email);
        }

        if(!subAdmin){
            throw Boom.notFound("Sub Admin not found");
        }

        return h.response(subAdmin).code(200);
    }

    static async updateSubAdmin(request: Request, h: ResponseToolkit){

        const updateSubAdmin = await AdminService.updateSubAdmin(
            request.params.id, request.payload as any
        );

        if(!updateSubAdmin){
            throw Boom.notFound("Sub Admin not found");
        }

        return h.response(updateSubAdmin).code(200);
    }

    static async deleteSubAdmin(request: Request, h: ResponseToolkit){

        const deleteSubAdmin = await AdminService.deleteSubAdmin(request.params.id);
        if(!deleteSubAdmin){
            throw Boom.notFound("Sub Admin Not Found");
        }

        return h.response({message: "SubAdmin Deleted Successfully"}).code(200);
    }
}