import { Result } from "../../core/logic/Result";
import { Node } from "../../domain/node";
import INodeDTO from "../../dto/INodeDTO";

export default interface INodeService {
    createNode(node: INodeDTO): Promise<Result<INodeDTO>>;
    listNodes(): Promise<Result<INodeDTO[]>>;
}