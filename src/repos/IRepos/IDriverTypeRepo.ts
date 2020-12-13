import { Repo } from "../../core/infra/Repo";
import { DriverType } from '../../domain/driverType';

export default interface IDriverTypeRepo extends Repo<DriverType> {
    getAll(): Promise<DriverType[]>;
}