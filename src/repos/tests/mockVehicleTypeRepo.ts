import { VehicleType } from "../../domain/vehicleType";
import IVehicleTypeRepo from "../IRepos/IVehicleTypeRepo";

export default class MockVehicleTypeRepo implements IVehicleTypeRepo {

    mockList: VehicleType[] = []

    constructor() {

    }

    public async getAll(): Promise<VehicleType[]> {
        return this.mockList
    }
    exists(t: VehicleType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async save(t: VehicleType): Promise<VehicleType> {
        return t
    }
}