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

    exists(t: Line): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(line: Line): Promise<Line> {

        const query = { $or: [{ code: line.code }, { name: line.name }] }

        const lineDocument = await this.lineSchema.findOne(query)

        try {
            if (lineDocument === null) {
                const rawLine: any = LineMap.toPersistence(line)

                const lineCreated = await this.lineSchema.create(rawLine)

                return LineMap.toDomain(lineCreated)
            } else {
                lineDocument.code = line.code,
                    lineDocument.name = line.name,
                    lineDocument.colorRGB = line.colorRGB,
                    lineDocument.terminalNodes = line.terminalNodes,
                    lineDocument.allowedDriverTypes = line.allowedDriverTypes,
                    lineDocument.allowedVehicleTypes = line.allowedVehicleTypes
                await lineDocument.save()

                return line
            }
        } catch (error) {
            throw error
        }
    }

}