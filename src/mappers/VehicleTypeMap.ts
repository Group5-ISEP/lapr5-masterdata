import { Mapper } from "../core/infra/Mapper";
import { VehicleType } from "../domain/vehicleType";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";

export class VehicleTypeMap extends Mapper<VehicleType>{
    public static toDTO(vehicleType: VehicleType): IVehicleTypeDTO {
        return {
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            costByKm: vehicleType.costByKm,
            averageConsumption: vehicleType.averageConsumption,
            averageSpeed: vehicleType.averageSpeed,
            emissions: vehicleType.emissions,
            energySource: vehicleType.energySource
        } as IVehicleTypeDTO;
    }

    public static toPersistence(VehicleType: VehicleType): any {
        const raw = {
            _id: VehicleType.id.toString(),
            name: VehicleType.name,
            autonomy: VehicleType.autonomy,
            costByKm: VehicleType.costByKm,
            averageConsumption: VehicleType.averageConsumption,
            averageSpeed: VehicleType.averageSpeed,
            emissions: VehicleType.emissions,
            energySource: VehicleType.energySource
        }
        return raw
    }
}