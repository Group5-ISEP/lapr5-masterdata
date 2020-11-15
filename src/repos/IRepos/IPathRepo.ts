import { Repo } from "../../core/infra/Repo";
import { Path } from "../../domain/path";
import { PathId } from "../../domain/pathId";

export default interface IPathRepo extends Repo<Path> {
    save(path: Path): Promise<Path>;
    findById(pathId: PathId): Promise<Path>;
}