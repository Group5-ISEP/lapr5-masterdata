import { Repo } from "../../core/infra/Repo";
import { Node } from "../../domain/node";

export default interface INodeRepo extends Repo<Node> {
    save(node: Node): Promise<Node>;
    listNodes (nodeId: string): Promise<Node[]>;
    //mudar depois
}