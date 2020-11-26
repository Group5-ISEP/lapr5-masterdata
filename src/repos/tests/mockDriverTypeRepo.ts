import { DriverType } from "../../domain/driverType";
import IDriverTypeRepo from "../IRepos/IDriverTypeRepo";

export default class MockDriverTypeRepo implements IDriverTypeRepo {

    constructor() { }

    exists(t: DriverType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(t: DriverType): Promise<DriverType> {
        return t
    }

}