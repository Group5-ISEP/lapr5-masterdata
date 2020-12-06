import { Path } from "../../domain/path";
import IPathRepo from "../IRepos/IPathRepo";

export default class MockPathRepo implements IPathRepo {

    pathList: Path[] = []

    constructor() { }

    public async save(path: Path): Promise<Path> {
        return path
    }
    public async findByLine(lineCode: string): Promise<Path[]> {
        return this.pathList.filter(path => path.lineCode === lineCode)
    }
    exists(t: Path): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}