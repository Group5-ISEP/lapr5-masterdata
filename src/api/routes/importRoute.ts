import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import IImportController from '../../controllers/IControllers/IImportController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/importdata', route);

    const ctrl = Container.get(config.controller.import.name) as IImportController;

    route.post('',
        (req, res, next) => {
            ctrl.importFile(req, res, next)
        }
    );
};