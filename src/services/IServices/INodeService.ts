import { Node } from "../../domain/node";

export default interface INodeService {
    save(node: Node): Promise<Node>;
    ListNodes (nodeId: string): Promise<Node>;
    //mudar depois
}