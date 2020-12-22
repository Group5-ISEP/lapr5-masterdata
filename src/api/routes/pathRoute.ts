import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import Container from 'typedi';
import config from '../../../config';
import IPathController from '../../controllers/IControllers/IPathController';

const route = Router();

export default (app: Router) => {
    app.use('/path', route);

    const ctrl = Container.get(config.controller.path.name) as IPathController;

    route.post('',
        celebrate({
            body: Joi.object({
                //id: Joi.string().required(),
                lineCode: Joi.string().required(),
                direction: Joi.string().required(),
                segmentList: Joi.array().required(), //SegmentList
                firstNode: Joi.string().required(),
                lastNode: Joi.string().required(),
                isEmpty: Joi.boolean().required()
            })
        }),
        (req, res, next) => ctrl.createPath(req, res, next));

    route.get('/:lineCode',
        (req, res, next) => ctrl.getPathsOfLine(req, res, next));

}