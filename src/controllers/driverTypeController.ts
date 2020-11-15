import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";
import IDriverTypeDTO from '../dto/IDriverTypeDTO';
import IDriverTypeService from '../services/IServices/IDriverTypeService';

import IDriverTypeController from "./IControllers/IDriverTypeController";

import { Result } from "../core/logic/Result";

export default class DriverTypeController implements IDriverTypeController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.driverType.name) private driverTypeServiceInstance: IDriverTypeService
    ) { }

    public async createDriverType(req: Request, res: Response, next: NextFunction) {
        try {
            const driverTypeOrError = await this.driverTypeServiceInstance.createDriverType(req.body as IDriverTypeDTO) as Result<IDriverTypeDTO>;

            if (driverTypeOrError.isFailure) {
                return res.status(402).send();
            }

            const driverTypeDTO = driverTypeOrError.getValue();
            return res.status(201).json(driverTypeDTO);
        }
        catch (e) {
            return next(e);
        }

    };

}