import { Request, Response, NextFunction } from "express";
import { config } from "process";
import { Inject } from "typedi";
import { Result } from "../core/logic/Result";
import ILineController from "./IControllers/ILineController";

export default class LineController implements ILineController /* TODO: extends ../core/infra/BaseController */ {
    /*   constructor(
           @Inject(config.services.line.name) private lineServiceInstance: ILineService
       ) { }
   */
    public async createLine(req: Request, res: Response, next: NextFunction) {
        /* try {
             const LineOrError = await this.LineServiceInstance.createLine(req.body as ILineDTO) as Result<ILineDTO>;
 
             if (LineOrError.isFailure) {
                 return res.status(402).send();
             }
 
             const LineDTO = LineOrError.getValue();
             return res.status(201).json(LineDTO);
         }
         catch (e) {
             return next(e);
         }
 */
        res.status(200).send(req.body)
    };

}