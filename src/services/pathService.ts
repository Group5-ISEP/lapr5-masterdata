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
            //            console.log("Found " + paths.length + " paths in line " + lineCode);
            var pathsDTO = [];
            for (var i = 0; i < paths.length; i++) {
                const DTO = PathMap.toDTO(paths[i]) as IPathDTO;
                pathsDTO.push(DTO);
                console.log(paths[i]);
            }
            if (paths.length > 0) {
                return Result.ok<IPathDTO[]>(pathsDTO);
            }
            else {
                return Result.fail<IPathDTO[]>("No paths with line " + lineCode + " found");
            }
        } catch (e) {
            throw e;
        }
    }
}
