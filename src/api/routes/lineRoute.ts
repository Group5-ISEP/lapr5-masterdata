import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import ILineController from "../../controllers/IControllers/ILineController";

const route = Router();

export default (app: Router) => {
    app.use('/lines', route);

    //const ctrl = Container.get(config.controller.line.name) as ILineController;

    route.post('',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                name: Joi.string().required(),
                terminalNodes: Joi.array().items(Joi.string()).required(),
                colorRGB: Joi.object({
                    red: Joi.number().min(0).max(255).integer().required(),
                    green: Joi.number().min(0).max(255).integer().required(),
                    blue: Joi.number().min(0).max(255).integer().required()
                }).required(),
                allowedDriverTypes: Joi.array().items(Joi.string()).required(),
                allowedVehicleTypes: Joi.array().items(Joi.string()).required()
            })
        }),
        (req, res, next) => {
           res.status(200).send("OK")
           // ctrl.createLine(req, res, next)
        }
    );
};