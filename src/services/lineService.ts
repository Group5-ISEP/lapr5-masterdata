import { Service } from "typedi";
import { Result } from "../core/logic/Result";
import ILineDTO from "../dto/ILineDTO";
import ILineService from "./IServices/ILineService";

@Service()
export default class LineService implements ILineService {
    /* constructor(
         @Inject(config.repos.Line.name) private LineRepo: ILineRepo
     ) { }
 */
    public async createLine(lineDTO: ILineDTO): Promise<Result<ILineDTO>> {
        /* try {
 
             const LineOrError = await Line.create(LineDTO);
 
             if (LineOrError.isFailure) {
                 return Result.fail<ILineDTO>(LineOrError.errorValue());
             }
 
             const LineResult = LineOrError.getValue();
 
             await this.LineRepo.save(LineResult);
 
             const LineDTOResult = LineMap.toDTO(LineResult) as ILineDTO;
             return Result.ok<ILineDTO>(LineDTOResult)
         } catch (e) {
             throw e;
         }
         */
        return Result.ok<ILineDTO>(lineDTO)
    }

}