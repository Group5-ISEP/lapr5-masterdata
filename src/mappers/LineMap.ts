import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import ILinePersistence from "../dataschema/ILinePersistence";
import { Line } from "../domain/line";
import ILineDTO from "../dto/ILineDTO";

export class LineMap extends Mapper<Line>{

    public static toDTO(line: Line): ILineDTO {
        return {
            id: line.id.toString(),
            code: line.code,
            name: line.name,
            terminalNodes: line.terminalNodes,
            colorRGB: line.colorRGB,
            allowedDriverTypes: line.allowedDriverTypes,
            allowedVehicleTypes: line.allowedVehicleTypes
        } as ILineDTO;
    }

    public static toDomain(lineRaw: any): Line {

        const lineOrError = Line.create(
            {
                code: lineRaw.code,
                name: lineRaw.name,
                terminalNodes: lineRaw.terminalNodes,
                colorRGB: lineRaw.colorRGB,
                allowedDriverTypes: lineRaw.allowedDriverTypes,
                allowedVehicleTypes: lineRaw.allowedVehicleTypes
            },
            new UniqueEntityID(lineRaw.id)
        );

        lineOrError.isFailure ? console.log(lineOrError.error) : '';

        return lineOrError.isSuccess ? lineOrError.getValue() : null;
    }

    public static toPersistence(line: Line): ILinePersistence {
        return {
            id: line.id.toString(),
            code: line.code,
            name: line.name,
            terminalNodes: line.terminalNodes,
            colorRGB: line.colorRGB,
            allowedDriverTypes: line.allowedDriverTypes,
            allowedVehicleTypes: line.allowedVehicleTypes
        } as ILinePersistence
    }
}