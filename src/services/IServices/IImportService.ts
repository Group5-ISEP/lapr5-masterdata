import { Result } from "../../core/logic/Result";

export default interface IImportService {
  importFile(file: any): Promise<Result<string>>;
}