import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IPathDTO from "../dto/IPathDTO";

import { Path } from "../domain/path";
import PathRepo from "../repos/pathRepo";
import { Segment } from "../domain/segment";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class PathMap extends Mapper<Path> {

    public static toDTO(path: Path): IPathDTO {
        /*
        console.log("++++++Domain object:+++++++");
        console.log(path);
        console.log("+++++++++++++++++++++++++++");
        console.log(path.firstNode);
        */
        return {
            id: path.id.toString(),
            lineCode: path.lineCode,
            direction: path.direction,
            segmentList: path.segmentList,
            firstNode: path.firstNode,
            lastNode: path.lastNode
        } as IPathDTO;
    }

    public static async toDomain(raw: any): Promise<Path> {
        const pathOrError = Path.create({
            lineCode: raw.lineCode,
            direction: raw.direction,
            segmentList: raw.segmentList,
            firstNode: raw.firstNode,
            lastNode: raw.lastNode,
        }, new UniqueEntityID(raw._id))

        pathOrError.isFailure ? console.log(pathOrError.error) : '';

        return pathOrError.isSuccess ? pathOrError.getValue() : null;
    }

    public static toPersistence(path: Path): any {
        const a = {
            id: path.id,
            lineCode: path.lineCode,
            direction: path.direction,
            segmentList: path.segmentList,
            firstNode: path.firstNode,
            lastNode: path.lastNode,
        }
        return a;
    }
}