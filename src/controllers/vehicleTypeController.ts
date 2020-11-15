import { Request, Response, NextFunction } from "express";
import config from '../../config';
import { Inject } from "typedi";
import { Result } from "../core/logic/Result";
import IVehicleTypeController from "./IControllers/IVehicleTypeController";
import IVehicleTypeService from "../services/IServices/IVehicleTypeService";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";

export default class VehicleTypeController implements IVehicleTypeController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.vehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService
    ) { }


    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        try {
            const vehicleTypeOrError = await this.vehicleTypeServiceInstance.createVehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;

            if (vehicleTypeOrError.isFailure) {
                return res.status(402).send();
            }

            const vehicleTypeDTO = vehicleTypeOrError.getValue();
            return res.status(201).json(vehicleTypeDTO);
        }
        catch (e) {
            return next(e);
        }
    }

}