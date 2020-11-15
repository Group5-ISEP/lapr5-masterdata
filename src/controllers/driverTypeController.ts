import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IDriverTypeController from "./IControllers/IDriverTypeController";
//import IRoleService from '../services/IServices/IRoleService';
//import IRoleDTO from '../dto/IRoleDTO';

//import { Result } from "../core/logic/Result";

export default class DriverTypeController implements IDriverTypeController /* TODO: extends ../core/infra/BaseController */ {
    /*   constructor(
           @Inject(config.services.role.name) private roleServiceInstance: IRoleService
       ) { }
   */
    public async createDriverType(req: Request, res: Response, next: NextFunction) {
        res.status(200).send('PLACEHOLDER')
        /* try {
             const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;
 
             if (roleOrError.isFailure) {
                 return res.status(402).send();
             }
 
             const roleDTO = roleOrError.getValue();
             return res.status(201).json(roleDTO);
         }
         catch (e) {
             return next(e);
         }
         */
    };

}