import { Service, Inject } from 'typedi';
import { NodeMap } from "../mappers/NodeMap"
import { Node } from "../domain/node";
import INodeRepo from "./IRepos/INodeRepo";
import { Document, Model } from 'mongoose';
import { INodePersistence } from '../dataschema/INodePersistence';


@Service()
export default class NodeRepo implements INodeRepo {

    constructor(
        @Inject('nodeSchema') private nodeSchema: Model<INodePersistence & Document>,
    ) { }

    exists(t: Node): Promise<boolean> {
        throw new Error("Method not implemented.");
        //const query = { shortName: node.shortName };

        //const nodeDocument = await this.nodeSchema.findOne(query);
    }

    public async save(node: Node): Promise<Node> {

        try {
            const rawNode: any = NodeMap.toPersistence(node);

            const nodeCreated = await this.nodeSchema.create(rawNode);

            return NodeMap.toDomain(nodeCreated);
        } catch (err) {
            throw err;
        }
    }

    public async getNodes(): Promise<Node[]> {

        try {
            const nodeDocumentList = await this.nodeSchema.find();  //find all  
            const nodeList = nodeDocumentList.map(nodeDocument => NodeMap.toDomain(nodeDocument))
            return nodeList;
        } catch (err) {
            throw err;
        }

    }

    public async getNodeByShortName(shortName: string): Promise<Node> {

        try {
            const nodeDocument = await this.nodeSchema.findOne({ shortName: shortName });
            return NodeMap.toDomain(nodeDocument);
        } catch (err) {
            throw err;
        }
    }
}
