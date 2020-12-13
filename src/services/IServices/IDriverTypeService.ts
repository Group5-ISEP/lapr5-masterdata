import { Result } from "../../core/logic/Result";
import IDriverTypeDTO from "../../dto/IDriverTypeDTO";

export default interface IDriverTypeService {
  createDriverType(driverTypeDTO: IDriverTypeDTO): Promise<Result<IDriverTypeDTO>>;
  listDriverTypes(): Promise<Result<IDriverTypeDTO[]>>
}