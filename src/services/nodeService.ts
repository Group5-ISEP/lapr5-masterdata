import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { Node } from "../domain/node";
import INodeDTO from '../dto/INodeDTO';
import { NodeMap } from '../mappers/NodeMap';
import INodeRepo from '../repos/IRepos/INodeRepo';
import INodeService from "./IServices/INodeService";

@Service()
export default class NodeService implements INodeService {

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

    listNodes(nodeId: string): Promise<Result<Node>> {
        throw new Error("Method not implemented.");
    }
}