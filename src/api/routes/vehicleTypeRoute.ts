import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IVehicleTypeController from "../../controllers/IControllers/IVehicleTypeController";

const route = Router()

export default (app: Router) => {
    app.use('/vehicletypes', route)

    const ctrl = Container.get(config.controller.vehicleType.name) as IVehicleTypeController;

    route.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                autonomy: Joi.number().integer().required(),
                costByKm: Joi.number().required(),
                averageConsumption: Joi.number().required(),
                averageSpeed: Joi.number().required(),
                emissions: Joi.number().required(),
                energySource: Joi.string().required()
            })
        }),
        (req, res, next) => {
            ctrl.createVehicleType(req, res, next)
        }
    );

    route.get('',
        (req, res, next) => {
            ctrl.listVehicleTypes(req, res, next)
        }
    )

}