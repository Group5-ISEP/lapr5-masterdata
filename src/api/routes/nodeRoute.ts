import { celebrate, Joi } from 'celebrate';
import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
var node_controller = require('../../controllers/IControllers/INodeController');

const route = Router();

export default (app: Router) => {
  app.use('/node', route);

    route.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required()
            })
        }),
        (req, res, next) => node_controller.createnode(req, res, next));

    //To get the lines nodes of a line, use lineRoute (that calls nodeController)
}