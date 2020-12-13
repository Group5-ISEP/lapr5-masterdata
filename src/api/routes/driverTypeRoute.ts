import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import IDriverTypeController from '../../controllers/IControllers/IDriverTypeController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/drivertypes', route);

    const ctrl = Container.get(config.controller.driverType.name) as IDriverTypeController;

    route.post('',
        celebrate({
            body: Joi.object({
                description: Joi.string().required()
            })
        }),
        (req, res, next) => {
            ctrl.createDriverType(req, res, next)
        }
    );

    route.get('',
        (req, res, next) => {
            ctrl.listDriverTypes(req, res, next)
        }
    )
};