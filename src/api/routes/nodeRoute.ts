import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import INodeController from '../../controllers/IControllers/INodeController';
import config from "../../../config";
import { join } from 'lodash';

const route = Router();

export default (app: Router) => {
    app.use('/node', route);

    const ctrl = Container.get(config.controller.node.name) as INodeController;

    route.post('',
        celebrate({
            body: Joi.object({
                shortName: Joi.string().required(),
                name: Joi.string().required(), 
                depot: Joi.boolean().required(),
                reliefPoint: Joi.boolean().required(),
                longitude: Joi.number().required(),
                latitude: Joi.number().required() 
            })
        }),
        (req, res, next) => {
            ctrl.save(req, res, next)
        }
    )

    route.get('',
        celebrate({
            body: Joi.object({
                lineCode: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.ListNodes(req, res, next));
}