import Joi from "joi";
import { AuthController } from '../../controller/auth/auth.controller';
import { ServerRoute } from "@hapi/hapi";


export const authRoutes: ServerRoute[] = [
    
    {
        method: "POST",
        path: "/api/auth/login",
        handler: AuthController.login,
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        }
    },

    {
        method: "POST",
        path: "/api/auth/register-super-admin",
        handler: AuthController.registerSuperAdmin,
        options: {
            auth: false
        }
    }

];

