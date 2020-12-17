import { Service, Inject } from 'typedi';
import config from "../../config";
import IDriverTypeDTO from '../dto/IDriverTypeDTO';
import { DriverType } from "../domain/driverType";
import IDriverTypeRepo from '../repos/IRepos/IDriverTypeRepo';
import IDriverTypeService from './IServices/IDriverTypeService';
import { Result } from "../core/logic/Result";
import { DriverTypeMap } from "../mappers/DriverTypeMap";

@Service()
export default class DriverTypeService implements IDriverTypeService {
    constructor(
        @Inject(config.repos.driverType.name) private driverTypeRepo: IDriverTypeRepo
    ) { }

    public async createDriverType(driverTypeDTO: IDriverTypeDTO): Promise<Result<IDriverTypeDTO>> {
        try {

            const driverTypeOrError = DriverType.create(driverTypeDTO);

            if (driverTypeOrError.isFailure) {
                return Result.fail<IDriverTypeDTO>(driverTypeOrError.errorValue());
            }

            const driverType = driverTypeOrError.getValue();

            const driverTypeSaved = await this.driverTypeRepo.save(driverType);

            const driverTypeDTOResult = DriverTypeMap.toDTO(driverTypeSaved) as IDriverTypeDTO;
            return Result.ok<IDriverTypeDTO>(driverTypeDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async listDriverTypes(): Promise<Result<IDriverTypeDTO[]>> {
        try {
            const driverTypes = await this.driverTypeRepo.getAll()

            const dtoList = driverTypes.map(driverType => DriverTypeMap.toDTO(driverType))

            return Result.ok<IDriverTypeDTO[]>(dtoList)
        } catch (error) {
            Result.fail<IDriverTypeDTO[]>(error)
        }
    }

}
