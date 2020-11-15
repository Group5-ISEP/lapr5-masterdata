import config from '../../config';
import { Service, Inject } from "typedi";
import { Result } from "../core/logic/Result";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";
import IVehicleTypeService from "./IServices/IVehicleTypeService";

@Service()
export default class VehicleTypeService implements IVehicleTypeService {
    /*  constructor(
          @Inject(config.repos.vehicleType.name) private VehicleTypeRepo: IVehicleTypeRepo
      ) { }
  */
    public async createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
        /* try {
 
             const VehicleTypeOrError = await VehicleType.create(VehicleTypeDTO);
 
             if (VehicleTypeOrError.isFailure) {
                 return Result.fail<IVehicleTypeDTO>(VehicleTypeOrError.errorValue());
             }
 
             const VehicleTypeResult = VehicleTypeOrError.getValue();
 
             await this.VehicleTypeRepo.save(VehicleTypeResult);
 
             const VehicleTypeDTOResult = VehicleTypeMap.toDTO(VehicleTypeResult) as IVehicleTypeDTO;
             return Result.ok<IVehicleTypeDTO>(VehicleTypeDTOResult)
         } catch (e) {
             throw e;
         }
         */
        return Result.ok<IVehicleTypeDTO>(vehicleTypeDTO)
    }

}
