import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { Node } from "../domain/node";
import IRoleRepo from './IRepos/IRoleRepo';
import INodeService from "./IServices/INodeService";

@Service()
export default class NodeService implements INodeService {
    roleRepo: any;

    constructor(
        @Inject(config.services.node.name) private nodeServiceInstance : INodeService
    ) {}

    public async createNode(node: Node): Promise<Result<Node>> {
        try{

            await this.nodeServiceInstance.save(node);
            return Result.ok<Node> (node)

        }
    }
    ListNodes(nodeId: string): Promise<Node> {
        throw new Error("Method not implemented.");
    }
}