import { Result } from "../../core/logic/Result";
import { Node } from "../../domain/node";

export default interface INodeService {
    createNode(node: Node): Promise<Result<Node>>;
    listNodes (name: string): Promise<Result<Node>>;
    //mudar depois
}