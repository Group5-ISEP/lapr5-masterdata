import { Line } from "../../domain/line";
import ILineRepo from "../IRepos/ILineRepo";

export default class MockLineRepo implements ILineRepo {

    mockLines: Line[] = []

    constructor() {

    }

    public async getLines(): Promise<Line[]> {
        return this.mockLines
    }

    exists(t: Line): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async save(t: Line): Promise<Line> {
        return t;
    }
}