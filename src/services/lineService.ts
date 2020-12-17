import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import ILineDTO from "../dto/ILineDTO";
import ILineService from "./IServices/ILineService";
import config from '../../config';
import ILineRepo from "../repos/IRepos/ILineRepo";
import { Line } from "../domain/line";
import { LineMap } from "../mappers/LineMap";

@Service()
export default class LineService implements ILineService {
    constructor(
        @Inject(config.repos.line.name) private lineRepo: ILineRepo
    ) { }


    public async listLines(): Promise<Result<ILineDTO[]>> {

        const lineList = await this.lineRepo.getLines()

        let lineDtoList = lineList.map(line => LineMap.toDTO(line))

        return Result.ok(lineDtoList)
    }

    public async createLine(lineDTO: ILineDTO): Promise<Result<ILineDTO>> {
        try {

            const lineOrError = Line.create(lineDTO);

            if (lineOrError.isFailure) {
                return Result.fail<ILineDTO>(lineOrError.errorValue());
            }

            const line = lineOrError.getValue();

            const lineSaved = await this.lineRepo.save(line);

            const lineDTOResult = LineMap.toDTO(lineSaved) as ILineDTO;
            return Result.ok<ILineDTO>(lineDTOResult)
        } catch (e) {
            throw e;
        }
    }

}