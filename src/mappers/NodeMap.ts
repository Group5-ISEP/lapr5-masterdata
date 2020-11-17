import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { INodePersistence } from '../dataschema/INodePersistence';

import { Node } from "../domain/node";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class NodeMap extends Mapper<Node>{

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

    public static toPersistence(node: Node): any {
        
        return {
            shortName: node.shortName,
            name: node.name,
            depot: node.depot,
            reliefPoint: node.reliefPoint,
            longitude: node.longitude,
            latitude: node.latitude,
        }
    }

}