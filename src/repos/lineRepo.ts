import { Model, Document } from "mongoose";
import { Service, Inject } from "typedi";
import ILinePersistence from "../dataschema/ILinePersistence";
import { Line } from "../domain/line";
import { LineMap } from "../mappers/LineMap";
import ILineRepo from "./IRepos/ILineRepo";

@Service()
export default class LineRepo implements ILineRepo {
    constructor(
        @Inject('lineSchema') private lineSchema: Model<ILinePersistence & Document>,
    ) { }

    public async getLines(): Promise<Line[]> {
        try {
            const lineDocumenList = await this.lineSchema.find()
            const lineList = lineDocumenList.map(lineDocument => LineMap.toDomain(lineDocument))
            return lineList
        } catch (error) {
            throw error
        }
    }

    exists(t: Line): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(line: Line): Promise<Line> {

        try {
            const rawLine: any = LineMap.toPersistence(line)

            const lineCreated = await this.lineSchema.create(rawLine)

            return LineMap.toDomain(lineCreated)
        } catch (error) {
            throw error
        }
    }

}