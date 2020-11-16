import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

export default interface IPathService {
	createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
	getPathsOfLine(lineCode: string): Promise<Result<IPathDTO[]>>;
}