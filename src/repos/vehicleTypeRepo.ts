import { Model, Document } from "mongoose";
import { Service, Inject } from "typedi";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { VehicleType } from "../domain/vehicleType";
import IVehicleTypeRepo from "./IRepos/IVehicleTypeRepo";
import IVehicleTypePersistence from '../dataschema/IVehicleTypePersistence';
import { VehicleTypeMap } from "../mappers/VehicleTypeMap";

@Service()
export default class VehicleTypeRepo implements IVehicleTypeRepo {
    constructor(
        @Inject('vehicleTypeSchema') private vehicleTypeSchema: Model<IVehicleTypePersistence & Document>,
    ) { }

    exists(t: VehicleType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(vehicleType: VehicleType): Promise<VehicleType> {

        const query = { name: vehicleType.name }

        const vehicleTypeDocument = await this.vehicleTypeSchema.findOne(query)

        try {
            if (vehicleTypeDocument === null) {
                const rawVehicleType: any = VehicleTypeMap.toPersistence(vehicleType)

                const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType)

                const returnValue = VehicleType.create(
                    {
                        name: vehicleTypeCreated.name,
                        autonomy: vehicleTypeCreated.autonomy,
                        costByKm: vehicleTypeCreated.costByKm,
                        averageConsumption: vehicleTypeCreated.averageConsumption,
                        averageSpeed: vehicleTypeCreated.averageSpeed,
                        emissions: vehicleTypeCreated.emissions,
                        energySource: vehicleTypeCreated.energySource
                    }
                    , new UniqueEntityID(rawVehicleType._id)
                ).getValue();
                return returnValue
            } else {
                vehicleTypeDocument.name = vehicleType.name
                vehicleTypeDocument.autonomy = vehicleType.autonomy
                vehicleTypeDocument.averageConsumption = vehicleType.averageConsumption
                vehicleTypeDocument.averageSpeed = vehicleType.averageSpeed
                vehicleTypeDocument.costByKm = vehicleType.costByKm
                vehicleTypeDocument.emissions = vehicleType.emissions
                vehicleTypeDocument.energySource = vehicleType.energySource

                await vehicleTypeDocument.save()

                return vehicleType
            }
        } catch (error) {
            throw error
        }
    }

}