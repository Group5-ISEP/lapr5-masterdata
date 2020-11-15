import { Result } from "../../core/logic/Result";
import { PathId } from "../../domain/pathId";
import IPathDTO from "../../dto/IPathDTO";

export default interface IPathService {
	createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
	getPath(pathID: PathId): Promise<Result<IPathDTO>>;
}