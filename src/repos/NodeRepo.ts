import { Service, Inject } from 'typedi';
import { NodeMap } from "../mappers/NodeMap"
import { Node } from "../domain/node";
import INodeRepo from "./IRepos/INodeRepo";
import { Document, Model } from 'mongoose';
import { INodePersistence } from '../dataschema/INodePersistence';


@Service()
export default class NodeRepo implements INodeRepo {
    private models: any;

    constructor(
        @Inject('nodeSchema') private nodeSchema: Model<INodePersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    exists(t: Node): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(node: Node): Promise<Node> {
        const query = { domainId: node.id.toString() };

        const nodeDocument = await this.nodeSchema.findOne(query);

        try {
            if (nodeDocument === null) {
                const rawNode: any = NodeMap.toPersistence(node);

                const nodeCreated = await this.nodeSchema.create(rawNode);

                return NodeMap.toDomain(nodeCreated);
            } else {
                nodeDocument.name = node.name;
                await nodeDocument.save();

                return node;
            }
        } catch (err) {
            throw err;
        }
    }
    ListNodes(nodeId: string): Promise<Node> {
        throw new Error("Method not implemented.");
    }




}
