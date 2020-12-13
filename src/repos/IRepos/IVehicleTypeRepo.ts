import { Repo } from "../../core/infra/Repo";
import { VehicleType } from '../../domain/vehicleType';

export default interface IVehicleTypeRepo extends Repo<VehicleType> {
    getAll(): Promise<VehicleType[]>;
}