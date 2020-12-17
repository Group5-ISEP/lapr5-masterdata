import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import IVehicleTypePersistence from "../dataschema/IVehicleTypePersistence";
import { VehicleType } from "../domain/vehicleType";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";

export class VehicleTypeMap extends Mapper<VehicleType>{
    public static toDTO(vehicleType: VehicleType): IVehicleTypeDTO {
        return {
            id: vehicleType.id.toString(),
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            costByKm: vehicleType.costByKm,
            averageConsumption: vehicleType.averageConsumption,
            averageSpeed: vehicleType.averageSpeed,
            emissions: vehicleType.emissions,
            energySource: vehicleType.energySource
        } as IVehicleTypeDTO;
    }

    public static toDomain(vehicleTypeRaw: any): VehicleType {
        const vehicleTypeOrError = VehicleType.create(
            {
                name: vehicleTypeRaw.name,
                autonomy: vehicleTypeRaw.autonomy,
                costByKm: vehicleTypeRaw.costByKm,
                averageConsumption: vehicleTypeRaw.averageConsumption,
                averageSpeed: vehicleTypeRaw.averageSpeed,
                emissions: vehicleTypeRaw.emissions,
                energySource: vehicleTypeRaw.energySource
            },
            new UniqueEntityID(vehicleTypeRaw.id)
        );

        vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';

        return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
    }

    public static toPersistence(vehicleType: VehicleType): IVehicleTypePersistence {
        const raw = {
            id: vehicleType.id.toString(),
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            costByKm: vehicleType.costByKm,
            averageConsumption: vehicleType.averageConsumption,
            averageSpeed: vehicleType.averageSpeed,
            emissions: vehicleType.emissions,
            energySource: vehicleType.energySource
        } as IVehicleTypePersistence
        return raw
    }
}