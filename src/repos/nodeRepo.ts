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
    }

    public async save(node: Node): Promise<Node> {

        const query = { shortName: node.shortName };

        const nodeDocument = await this.nodeSchema.findOne(query);

        try {
            if (nodeDocument === null) {
                const rawNode: any = NodeMap.toPersistence(node);

                const nodeCreated = await this.nodeSchema.create(rawNode);

                return NodeMap.toDomain(nodeCreated);
            } else {
                nodeDocument.shortName = node.shortName;
                nodeDocument.name = node.name;
                nodeDocument.isDepot = node.isDepot;
                nodeDocument.isReliefPoint = node.isReliefPoint;
                nodeDocument.longitude = node.longitude;
                nodeDocument.latitude = node.latitude;


                await nodeDocument.save();

                return node;
            }
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
}
