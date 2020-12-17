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

    public async getAll(): Promise<VehicleType[]> {
        const result = await this.vehicleTypeSchema.find()

        const vehicleTypeList = result.map(doc => VehicleTypeMap.toDomain(doc))

        return vehicleTypeList
    }

    exists(t: VehicleType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(vehicleType: VehicleType): Promise<VehicleType> {

        try {
            const rawVehicleType: any = VehicleTypeMap.toPersistence(vehicleType)

            const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType)

            return VehicleTypeMap.toDomain(vehicleTypeCreated)
        } catch (error) {
            throw error
        }
    }

}