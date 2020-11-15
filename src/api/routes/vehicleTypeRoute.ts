import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IVehicleTypeController from "../../controllers/IControllers/IVehicleTypeController";

const route = Router()

export default (app: Router) => {
    app.use('/vehicletypes', route)

    // const ctrl = Container.get(config.controller.vehicleType.name) as IVehicleTypeController;

    route.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                autonomy: Joi.number().integer().positive().required(),
                costByKm: Joi.number().positive().required(),
                averageConsumption: Joi.number().positive().required(),
                averageSpeed: Joi.number().positive().required(),
                emissions: Joi.number().positive().required(),
                energySource: Joi.string().regex(/(Diesel)|(Gasoline)|(Electric)|(GPL)|(Gas)/, 'fuels').required()
            })
        }),
        (req, res, next) => {
            res.send(req.body) //PLACEHOLDER
            //     ctrl.createDriverType(req, res, next)
        }
    );

}