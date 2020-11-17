import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { INodePersistence } from '../dataschema/INodePersistence';

import { Node } from "../domain/node";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import INodeDTO from "../dto/INodeDTO";

export class NodeMap extends Mapper<Node>{

    public static toDTO(node: Node): INodeDTO {
        return {
            shortName: node.shortName,
            name: node.name,
            depot: node.depot,
            reliefPoint: node.reliefPoint,
            longitude: node.longitude,
            latitude: node.latitude,
        } as INodeDTO
    }

    public static async toDomain(raw: any): Promise<Node> {
        const nodeOrError = Node.create({
            shortName: raw.shortName,
            name: raw.name,
            depot: raw.depot,
            reliefPoint: raw.reliefPoint,
            longitude: raw.longitude,
            latitude: raw.latitude,
        }, new UniqueEntityID(raw._id))

        nodeOrError.isFailure ? console.log(nodeOrError.error) : '';

        return nodeOrError.isSuccess ? nodeOrError.getValue() : null;
    }

    public static toPersistence(node: Node): INodePersistence {

        return {
            shortName: node.shortName,
            name: node.name,
            depot: node.depot,
            reliefPoint: node.reliefPoint,
            longitude: node.longitude,
            latitude: node.latitude,
        } as INodePersistence
    }

}