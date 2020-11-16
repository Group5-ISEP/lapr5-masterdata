import { Mapper } from "../core/infra/Mapper";
import { DriverType } from "../domain/driverType";
import IDriverTypeDTO from "../dto/IDriverTypeDTO";

export class DriverTypeMap extends Mapper<DriverType>{
    public static toDTO(driverType: DriverType): IDriverTypeDTO {
        return {
            description: driverType.description,
        } as IDriverTypeDTO;
    }

    public static toPersistence(driverType: DriverType): any {
        const raw = {
            _id: driverType.id.toString(),
            description: driverType.description
        }
        return raw
    }
}