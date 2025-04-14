import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { AuthService } from "../../services/auth/auth.service";
import { generateToken } from '../../utils/index';



export class AuthController {

    static async login(request: Request, h: ResponseToolkit){
        const { email, password } = request.payload as { email: string, password: string};

        const user = await AuthService.login(email, password);

        if(!user){
            throw Boom.unauthorized("Invalid Credentials");
        }

        const token = generateToken(user);
        return h.response({token}).code(200);
    }


    static async registerSuperAdmin(request: Request, h: ResponseToolkit){
        const superAdmin = await AuthService.registerSuperAdmin();
        return h.response(superAdmin).code(201);
    }
}

