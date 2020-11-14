import { celebrate, Joi } from 'celebrate';
import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
var path_controller = require('../../controllers/pathController');

const route = Router();

export default (app: Router) => {
  app.use('/path', route);

    route.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required()
            })
        }),
        (req, res, next) => path_controller.createPath(req, res, next));

    //To get the lines paths of a line, use lineRoute (that calls pathController)
}
