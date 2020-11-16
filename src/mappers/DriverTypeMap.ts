import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { IDriverTypePersistence } from "../dataschema/IDriverTypePersistence";
import { DriverType } from "../domain/driverType";
import IDriverTypeDTO from "../dto/IDriverTypeDTO";

export class DriverTypeMap extends Mapper<DriverType>{

    public static toDTO(driverType: DriverType): IDriverTypeDTO {
        return {
            description: driverType.description,
        } as IDriverTypeDTO;
    }

    public static toDomain(driverTypeRaw: any): DriverType {
        const driverTypeOrError = DriverType.create(
            {
                description: driverTypeRaw.description,
            },
            new UniqueEntityID(driverTypeRaw._id)
        );

        driverTypeOrError.isFailure ? console.log(driverTypeOrError.error) : '';

        return driverTypeOrError.isSuccess ? driverTypeOrError.getValue() : null;
    }

    public static toPersistence(driverType: DriverType): IDriverTypePersistence {
        const raw = {
            description: driverType.description
        }
        return raw
    }
}