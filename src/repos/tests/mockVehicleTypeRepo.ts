import { VehicleType } from "../../domain/vehicleType";
import IVehicleTypeRepo from "../IRepos/IVehicleTypeRepo";

export default class MockVehicleTypeRepo implements IVehicleTypeRepo {
    constructor() {

    }
    exists(t: VehicleType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async save(t: VehicleType): Promise<VehicleType> {
        return t
    }
}