import { Service, Inject } from 'typedi';
import config from "../../config";
import IPathDTO from '../dto/IPathDTO';
import { Path } from "../domain/path";
import IPathRepo from '../repos/IRepos/IPathRepo';
import IPathService from './IServices/IPathService';
import { Result } from "../core/logic/Result";
import { PathMap } from "../mappers/PathMap";

@Service()
export default class PathService implements IPathService {
    constructor(
        @Inject(config.repos.path.name) private pathRepo: IPathRepo
    ) { }

    public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
        try {

            const pathOrError = Path.create(pathDTO);

            if (pathOrError.isFailure) {
                console.log("failed creating path");
                return Result.fail<IPathDTO>(pathOrError.errorValue());
            }

            const path = pathOrError.getValue();

            const pathSaved = await this.pathRepo.save(path);

            const pathDTOResult = PathMap.toDTO(pathSaved) as IPathDTO;
            return Result.ok<IPathDTO>(pathDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async getPathsOfLine(lineCode: string): Promise<Result<IPathDTO[]>> {
        try {
            const paths = await this.pathRepo.findByLine(lineCode);
            const pathsDTO = paths.map(path => PathMap.toDTO(path))
            return Result.ok<IPathDTO[]>(pathsDTO);
        } catch (e) {
            throw e;
        }
    }
}
