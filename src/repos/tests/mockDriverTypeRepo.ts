import { DriverType } from "../../domain/driverType";
import IDriverTypeRepo from "../IRepos/IDriverTypeRepo";

export default class MockDriverTypeRepo implements IDriverTypeRepo {

    mockList: DriverType[] = []

    constructor() { }

    public async getAll(): Promise<DriverType[]> {
        return this.mockList
    }

    exists(t: DriverType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(t: DriverType): Promise<DriverType> {
        return t
    }

}