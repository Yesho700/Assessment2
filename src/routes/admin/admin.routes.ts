
import { AdminController } from '../../controller/admin/admin.controller';
import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";

const subAdminSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isActive: Joi.boolean().default(true)
});

export const adminRoutes: ServerRoute[] = [

    {
        method: "POST",
        path: "/api/admin/sub-admins",
        handler: AdminController.createSubAdmin,
        options: {
            validate: {
                payload: subAdminSchema
            }
        }
    },

    {
        method: "GET",
        path: "/api/admin/sub-admins",
        handler: AdminController.getSubAdmins
    },

    {
        method: "GET",
        path: "/api/admin/sub-admins/{id}",
        handler: AdminController.getSubAdmin,
        options: {
            validate:{
                params: Joi.object({
                    id: Joi.string().required()
                }),
            }
        }
    },

    {
        method: "GET",
        path: "/api/admin/sub-admins/{email}",
        handler: AdminController.getSubAdmin,
        options: {
            validate:{
                params: Joi.object({
                    email: Joi.string().required()
                })
            }
        }
    },

    {
        method: "PUT",
        path: "/api/admin/sub-admins/{id}",
        handler: AdminController.updateSubAdmin,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),

                payload: subAdminSchema
            }
        }
    },

    {
        method: "DELETE",
        path: "/api/admin/sub-admins/{id}",
        handler: AdminController.deleteSubAdmin,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        }
    }
]
