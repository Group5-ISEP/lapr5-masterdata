import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IPathController from "./IControllers/IPathController";
import IPathService from '../services/IServices/IPathService';
import IPathDTO from '../dto/IPathDTO';

import { Result } from "../core/logic/Result";

export default class PathController implements IPathController {
    constructor(
        @Inject(config.services.path.name) private pathServiceInstance: IPathService
    ) { }

    public async createPath(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;

            if (pathOrError.isFailure) {
                return res.status(409).send(pathOrError.errorValue());
            }

            const pathDTO = pathOrError.getValue();
            return res.status(201).json(pathDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getPathsOfLine(req: Request, res: Response, next: NextFunction) {
        try {
            const pathsOrError = await this.pathServiceInstance.getPathsOfLine(req.params.lineCode) as Result<IPathDTO[]>;
            const pathsDTO = pathsOrError.getValue();
            return res.status(200).json(pathsDTO);
        }
        catch (e) {
            return next(e);
        }
    };
}
