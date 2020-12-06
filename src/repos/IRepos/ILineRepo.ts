import { Repo } from "../../core/infra/Repo";
import { Line } from "../../domain/line";

export default interface ILineRepo extends Repo<Line> {
    getLines(): Promise<Line[]>;
}