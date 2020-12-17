
import { Mapper } from "../core/infra/Mapper";

import IPathDTO from "../dto/IPathDTO";

import { Path } from "../domain/path";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { IPathPersistence } from '../dataschema/IPathPersistence';


export class PathMap extends Mapper<Path> {

    public static toDTO(path: Path): IPathDTO {
        return {
            id: path.id.toString(),
            lineCode: path.lineCode,
            direction: path.direction,
            segmentList: path.segmentList,
            firstNode: path.firstNode,
            lastNode: path.lastNode,
            isEmpty: path.isEmpty
        } as IPathDTO;
    }

    public static async toDomain(raw: any): Promise<Path> {
        const pathOrError = Path.create({
            lineCode: raw.lineCode,
            direction: raw.direction,
            segmentList: raw.segmentList,
            firstNode: raw.firstNode,
            lastNode: raw.lastNode,
            isEmpty: raw.isEmpty
        } as IPathDTO, new UniqueEntityID(raw.id))

        pathOrError.isFailure ? console.log(pathOrError.error) : '';

        return pathOrError.isSuccess ? pathOrError.getValue() : null;
    }

    public static toPersistence(path: Path): any {
        const a = {
            id: path.id.toString(),
            lineCode: path.lineCode,
            direction: path.direction,
            segmentList: path.segmentList,
            firstNode: path.firstNode,
            lastNode: path.lastNode,
            isEmpty: path.isEmpty
        } as IPathPersistence
        return a;
    }
}