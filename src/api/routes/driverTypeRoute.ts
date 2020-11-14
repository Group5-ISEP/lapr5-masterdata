import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

// import IDriverTypeController from '../../controllers/IControllers/IDriverTypeController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/drivertypes', route);

    /*
      const ctrl = Container.get(config.controller.driverType.name) as IDriverTypeController;
    */

    route.post('',
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                description: Joi.string().required()
            })
        }),
        (req, res, next) => {
            res.status(200).send('FORMATO BODY VALIDO')
            //ctrl.createRole(req, res, next)
        }
    );
};