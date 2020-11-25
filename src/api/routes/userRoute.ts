import { celebrate, Joi } from 'celebrate';
import { Router, Request, Response } from 'express';
import Container from 'typedi';
import config from '../../../config';
import IUserController from '../../controllers/IControllers/IUserController';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    const ctrl = Container.get(config.controller.user.name) as IUserController;

    route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser,
        celebrate({
            body: Joi.object({
                email: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.getUser(req, res, next));

    route.post('',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createUser(req, res, next));

    route.put('',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.updateUser(req, res, next));
}
