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
            return Result.fail<IVehicleTypeDTO[]>(error)
        }

    }

    public async createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
        try {

            const vehicleTypeOrError = await VehicleType.create(vehicleTypeDTO);

            if (vehicleTypeOrError.isFailure) {
                return Result.fail<IVehicleTypeDTO>(vehicleTypeOrError.errorValue());
            }

            const vehicleTypeResult = vehicleTypeOrError.getValue();

            await this.vehicleTypeRepo.save(vehicleTypeResult);

            const vehicleTypeDTOResult = VehicleTypeMap.toDTO(vehicleTypeResult) as IVehicleTypeDTO;
            return Result.ok<IVehicleTypeDTO>(vehicleTypeDTOResult)
        } catch (e) {
            throw e;
        }
    }

}
