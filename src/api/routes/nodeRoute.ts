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
                shortName: Joi.string().required()
            })
        }),
        (req, res, next) => {
            ctrl.save(req, res, next)
        }
    );
}