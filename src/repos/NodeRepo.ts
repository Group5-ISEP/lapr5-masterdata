import { Service, Inject } from 'typedi';

import { Node } from "../domain/node";

import INodeRepo from "./IRepos/INodeRepo";

@Service()
export default class NodeRepo implements INodeRepo  {

    
    save(node: Node): Promise<Node> {
        throw new Error("Method not implemented.");
    }
    ListNodes(nodeId: string): Promise<Node> {
        throw new Error("Method not implemented.");
    }
    exists(t: Node): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


    
}
