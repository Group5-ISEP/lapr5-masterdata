import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { Node } from "../domain/node";
import INodeRepo from '../repos/IRepos/INodeRepo';
import INodeService from "./IServices/INodeService";

@Service()
export default class NodeService implements INodeService {

    constructor(
        @Inject(config.services.node.name) private nodeServiceInstance : INodeRepo
    ) {}
    public async createNode(node: Node): Promise<Result<Node>> {
        try{

            await this.nodeServiceInstance.save(node);
            return Result.ok<Node> (node)

        } catch(error){
            throw error;
        }
    }

    ListNodes(nodeId: string): Promise<Result<Node>>{
        throw new Error("Method not implemented.");
    }
}