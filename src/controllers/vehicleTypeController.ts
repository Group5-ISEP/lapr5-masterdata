import { Request, Response, NextFunction } from "express";
import IVehicleTypeController from "./IControllers/IVehicleTypeController";

export default class VehicleTypeController implements IVehicleTypeController /* TODO: extends ../core/infra/BaseController */ {
    /* constructor(
         @Inject(config.services.vehicleType.name) private vehicleTypeServiceInstance: IvehicleTypeService
     ) { }
     */

    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        /* try {
             const vehicleTypeOrError = await this.vehicleTypeServiceInstance.createvehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;
 
             if (vehicleTypeOrError.isFailure) {
                 return res.status(402).send();
             }
 
             const vehicleTypeDTO = vehicleTypeOrError.getValue();
             return res.status(201).json(vehicleTypeDTO);
         }
         catch (e) {
             return next(e);
         }
         */
        res.status(200).send(req.body)
    }

}