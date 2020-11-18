import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { Node } from "../domain/node";
import INodeDTO from '../dto/INodeDTO';
import IPathDTO from '../dto/IPathDTO';
import { NodeMap } from '../mappers/NodeMap';
import INodeRepo from '../repos/IRepos/INodeRepo';
import INodeService from "./IServices/INodeService";

@Service()
export default class NodeService implements INodeService {
    [x: string]: any;

    constructor(
        @Inject(config.repos.node.name) private nodeRepoInstance: INodeRepo
    ) { }
    public async createNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>> {
        try {
            const nodeOrError = await Node.create(nodeDTO);

            if (nodeOrError.isFailure) {
                return Result.fail<INodeDTO>(nodeOrError.errorValue());
            }

            const nodeResult = nodeOrError.getValue();

            await this.nodeRepoInstance.save(nodeResult);

            const lineDTOResult = NodeMap.toDTO(nodeResult) as INodeDTO;
            return Result.ok<INodeDTO>(lineDTOResult)

        } catch (error) {
            throw error;
        }
    }

    public async listNodes(nodeId: string): Promise<Result<INodeDTO[]>> {
        try {
            const nodes = await this.nodeRepo.listNodes(nodeId);
            console.log("Found " + nodes.length + " nodes starting by " + nodeId);
            var nodesDTO = [];
            for (var i = 0; i < nodes.length; i++) {
                const DTO = NodeMap.toDTO(nodes[i]) as INodeDTO;
                nodesDTO.push(DTO);
            }
            if (nodes.length > 0) {
                return Result.ok<INodeDTO[]>(nodesDTO);
            }
            else {
                return Result.fail<INodeDTO[]>("No paths with line " + nodeId + " found");
            }
        } catch (e) {
            throw e;
        }
    }
}