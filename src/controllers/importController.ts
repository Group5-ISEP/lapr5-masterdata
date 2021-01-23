import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IImportService from '../services/IServices/IImportService';
import IImportController from './IControllers/IImportController';

import { Result } from "../core/logic/Result";

export default class ImportController implements IImportController {
    constructor(
        @Inject(config.services.import.name) private importServiceInstance: IImportService
    ) { }

    public async importFile(req: Request, res: Response, next: NextFunction) {
        try {
            const stringOrError = await this.importServiceInstance.importFile(req) as Result<string>;

            if (stringOrError.isFailure) {
                return res.status(409).send(stringOrError.errorValue());
            }

            const result = stringOrError.getValue();
            return res.status(201).json(result);
        }
        catch (e) {
            return next(e);
        }

    };

}