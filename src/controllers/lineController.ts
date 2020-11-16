import { Request, Response, NextFunction } from "express";
import { Inject } from "typedi";
import { Result } from "../core/logic/Result";
import ILineController from "./IControllers/ILineController";
import config from '../../config';
import ILineService from "../services/IServices/ILineService";
import ILineDTO from "../dto/ILineDTO";
export default class LineController implements ILineController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.line.name) private lineServiceInstance: ILineService
    ) { }

    public async createLine(req: Request, res: Response, next: NextFunction) {
        try {
            const lineOrError = await this.lineServiceInstance.createLine(req.body as ILineDTO) as Result<ILineDTO>;

            if (lineOrError.isFailure) {
                return res.status(402).send();
            }

            const LineDTO = lineOrError.getValue();
            return res.status(201).json(LineDTO);
        }
        catch (e) {
            return next(e);
        }
    };

}