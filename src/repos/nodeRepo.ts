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
                nodeDocument.depot = node.depot;
                nodeDocument.reliefPoint = node.reliefPoint;
                nodeDocument.longitude = node.longitude;
                nodeDocument.latitude = node.latitude;


                await nodeDocument.save();

                return node;
            }
        } catch (err) {
            throw err;
        }
    }

    public async listNodes(filter: string): Promise<Node[]> {
        //TO DO order by
        //order by: add variavel order atraves de tudo; req.body.order;
                    //repo: ordenar lista nodes antes de retornar

       
    try {
        const allNodes = this.nodeSchema.find({});  //find all  
         if (allNodes != null) {
            var nodes = [];
            (await allNodes).forEach(async function (node) {
                const p = await NodeMap.toDomain(node);
                console.log(".."+p.id.toString());
                if(p.name.startsWith(filter) || p.id.toString().startsWith(filter)){
                   
                    nodes.push(p);
                }
                
            });
        
        }

    //se nodes.length > 0 
    // ordenar         
    return nodes;   

    } catch (err) {
        throw err;

    }

}}
