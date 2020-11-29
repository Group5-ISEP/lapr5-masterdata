import { Path } from "../../domain/path";
import IPathRepo from "../IRepos/IPathRepo";

export default class MockPathRepo implements IPathRepo {
    constructor() { }

    public async save(path: Path): Promise<Path> {
        return path
    }
    findByLine(lineCode: string): Promise<Path[]> {
        throw new Error("Method not implemented.");
    }
    exists(t: Path): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}