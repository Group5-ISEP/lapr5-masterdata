import config from '../../config';
import { Service, Inject } from "typedi";
import { Result } from "../core/logic/Result";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";
import IVehicleTypeService from "./IServices/IVehicleTypeService";
import IVehicleTypeRepo from '../repos/IRepos/IVehicleTypeRepo';
import { VehicleType } from '../domain/vehicleType';
import { VehicleTypeMap } from '../mappers/VehicleTypeMap';

@Service()
export default class VehicleTypeService implements IVehicleTypeService {
    constructor(
        @Inject(config.repos.vehicleType.name) private vehicleTypeRepo: IVehicleTypeRepo
    ) { }

    public async listVehicleTypes(): Promise<Result<IVehicleTypeDTO[]>> {
        try {
            const list = await this.vehicleTypeRepo.getAll()

            const dtoList = list.map(vehicleType => VehicleTypeMap.toDTO(vehicleType))

            return Result.ok<IVehicleTypeDTO[]>(dtoList)
        } catch (error) {
            throw error
        }

    }

    public async createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
        try {

            const vehicleTypeOrError = VehicleType.create(vehicleTypeDTO);

            if (vehicleTypeOrError.isFailure) {
                return Result.fail<IVehicleTypeDTO>(vehicleTypeOrError.errorValue());
            }

            const vehicleType = vehicleTypeOrError.getValue();

            const vehicleTypeSaved = await this.vehicleTypeRepo.save(vehicleType);

            const vehicleTypeDTOResult = VehicleTypeMap.toDTO(vehicleTypeSaved) as IVehicleTypeDTO;
            return Result.ok<IVehicleTypeDTO>(vehicleTypeDTOResult)
        } catch (e) {
            throw e;
        }
    }

}
