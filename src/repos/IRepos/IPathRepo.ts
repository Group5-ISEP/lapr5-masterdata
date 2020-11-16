import { Repo } from "../../core/infra/Repo";
import { Path } from "../../domain/path";

export default interface IPathRepo extends Repo<Path> {
    save(path: Path): Promise<Path>;
    findByLine(lineCode: string): Promise<Path[]>;
}