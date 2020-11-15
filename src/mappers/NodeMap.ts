import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { INodePersistence } from '../dataschema/INodePersistence';

import { Node } from "../domain/node";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class NodeMap extends Mapper<Node>{

    public static toDomain(node: any | Model<INodePersistence & Document>): Node {
        const roleOrError = Node.create(
            node,
            new UniqueEntityID(node.domainId)
        );

        roleOrError.isFailure ? console.log(roleOrError.error) : '';

        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }

    public static toPersistence(node: Node): any {
        return {
            domainId: node.shortName.toString(),
            name: node.name
        }
    }

}