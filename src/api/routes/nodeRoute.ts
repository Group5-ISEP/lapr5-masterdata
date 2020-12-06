import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import INodeController from '../../controllers/IControllers/INodeController';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/node', route);

    const ctrl = Container.get(config.controller.node.name) as INodeController;

    route.post('',
        celebrate({
            body: Joi.object({
                shortName: Joi.string().required(),
                name: Joi.string().required(),
                isDepot: Joi.boolean().required(),
                isReliefPoint: Joi.boolean().required(),
                longitude: Joi.number().required(),
                latitude: Joi.number().required()
            })
        }),
        (req, res, next) => {
            ctrl.save(req, res, next)
        }
    )

    route.get('',
        (req, res, next) => ctrl.listNodes(req, res, next));
}