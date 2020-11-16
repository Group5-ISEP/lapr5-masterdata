import { Result } from "../../core/logic/Result";
import ILineDTO from "../../dto/ILineDTO";

export default interface ILineService  {
  createLine(lineDTO: ILineDTO): Promise<Result<ILineDTO>>;
}